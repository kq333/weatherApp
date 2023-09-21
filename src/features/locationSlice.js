import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    locationData: [],
    inputValue: "",
    isLoading: false,
    hasError: false,
    searchError: false,
    cityData: JSON.parse(localStorage.getItem('cityData')) || [],
    cityCounter: JSON.parse(localStorage.getItem('cityCounter')) || {},
};

export const fetchDataFromAPI = createAsyncThunk(
    "fetchData",
    async (inputValue, { getState, rejectWithValue, dispatch }) => {
        const state = getState();
        const currentInputValue = state.location.inputValue;

        const URL = `https://api.weatherapi.com/v1/current.json?key=f51e05b2b15d42db90471810231909&q=${currentInputValue}&aqi=no`;

        try {
            const response = await fetch(URL);

            if (!response.ok) {
                if (response.status === 400) {
                    dispatch(setSearchError(true));
                    dispatch(setHasError(false));
                } else {
                    dispatch(setSearchError(false));
                    dispatch(setHasError(true));
                }

                return rejectWithValue(response);
            }

            const data = await response.json();
            return data;
        } catch (error) {

            dispatch(setSearchError(false));
            dispatch(setHasError(true));
            return rejectWithValue(error);
        }
    }
);

const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {
        setInputValue: (state, action) => {
            state.inputValue = action.payload;
        },
        setSearchError: (state, action) => {
            state.searchError = action.payload;
        },
        setHasError: (state, action) => {
            state.hasError = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDataFromAPI.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(fetchDataFromAPI.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                state.locationData.push(action.payload);

                const newCityData = {
                    city: state.inputValue.toLowerCase(),
                    date: new Date().toISOString(),
                    temperature: action.payload.current.feelslike_c,
                };
                state.cityData.push(newCityData);

                if (!state.cityCounter[newCityData.city]) {
                    state.cityCounter[newCityData.city] = 1;
                } else {
                    state.cityCounter[newCityData.city]++;
                }
            })
            .addCase(fetchDataFromAPI.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export const { setInputValue, setSearchError, setHasError } = locationSlice.actions;

export default locationSlice.reducer;
