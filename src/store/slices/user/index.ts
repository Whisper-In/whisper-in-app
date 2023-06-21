import { createSlice } from "@reduxjs/toolkit";
import { initialUserState } from "../../states/userState";
import { loadUser, logoutUserReducer, setUserReducer } from "../../reducers/userReducer";
import { fetchUserProfile } from "./thunks";

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: { setUser: setUserReducer, logoutUser: logoutUserReducer },  
  extraReducers: (builder) => {
    builder.addCase(fetchUserProfile.fulfilled, setUserReducer);    
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
