import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    locationData: [],
    inputValue: "",
    isLoading: true,
    hasError: false,
};


export const fetchDataFromAPI = createAsyncThunk(
    "fetchData",
    async (inputValue, { getState }) => {

        const state = getState();
        const currentInputValue = state.location.inputValue;


        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${currentInputValue}&appid=027ee07fafd9a678d925c3a9220c1289`;

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
