import { createSlice } from "@reduxjs/toolkit";
import { setDarkModeReducer, setIsLoadingReducer } from "../../reducers/appReducers";
import { initialAppState } from "../../states/app";

export const appSlice = createSlice({
  name: "app",
  initialState: initialAppState,
  reducers: { 
    setIsLoading: setIsLoadingReducer, 
    setDarkMode: setDarkModeReducer },
});

export const { setIsLoading, setDarkMode } = appSlice.actions;
export default appSlice.reducer;