import { createSlice } from "@reduxjs/toolkit";
import { setCurrentPlayingSoundURLReducer, setDarkModeReducer, setIsLoadingReducer } from "../../reducers/appReducers";
import { initialAppState } from "../../states/app";

export const appSlice = createSlice({
  name: "app",
  initialState: initialAppState,
  reducers: {
    setIsLoading: setIsLoadingReducer,
    setDarkMode: setDarkModeReducer,
    setCurrentPlayingSoundURL: setCurrentPlayingSoundURLReducer
  },
});

export const { setIsLoading, setDarkMode, setCurrentPlayingSoundURL } = appSlice.actions;
export default appSlice.reducer;