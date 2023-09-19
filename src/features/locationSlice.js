import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    locationData: [],
    inputValue: "",
    isLoading: false,
    hasError: false,
};


export const fetchDataFromAPI = createAsyncThunk(
    "fetchData",
    async (inputValue, { getState }) => {

        const state = getState();
        const currentInputValue = state.location.inputValue;

        const URL = `https://api.weatherapi.com/v1/current.json?key=f51e05b2b15d42db90471810231909&q=${currentInputValue}&aqi=no`

        const response = await fetch(URL);

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        return data;
    }
);

const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {
        setInputValue: (state, action) => {
            state.inputValue = action.payload;
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
            })
            .addCase(fetchDataFromAPI.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            });
    },
});

export const { setInputValue } = locationSlice.actions;

export default locationSlice.reducer;
