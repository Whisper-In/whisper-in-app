import { createSlice } from "@reduxjs/toolkit";
import { initialUserState } from "../../states/userState";
import { setUserReducer } from "../../reducers/userReducer";

const userSlice = createSlice({
  name: "user",
  reducers: { setUser: setUserReducer },
  initialState: initialUserState,
});

export const {setUser} = userSlice.actions;
export default userSlice.reducer;
