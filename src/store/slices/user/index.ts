import { createSlice } from "@reduxjs/toolkit";
import { initialUserState } from "../../states/userState";
import { logoutUserReducer, setUserReducer } from "../../reducers/userReducer";

const userSlice = createSlice({
  name: "user",
  reducers: { setUser: setUserReducer, logoutUser: logoutUserReducer },
  initialState: initialUserState,
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
