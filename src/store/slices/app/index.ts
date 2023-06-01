import { createSlice } from "@reduxjs/toolkit";
import { setIsLoadingReducer } from "../../reducers/appReducers";
import { initialAppState } from "../../states/app";

export const appSlice = createSlice({
  name: "app",
  initialState: initialAppState,
  reducers: { setIsLoading: setIsLoadingReducer },
});

export const { setIsLoading } = appSlice.actions;
export default appSlice.reducer;