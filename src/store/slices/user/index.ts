import { createSlice } from "@reduxjs/toolkit";
import { initialUserState } from "../../states/userState";

const userSlice = createSlice({
    name: "user",
    reducers: {},    
    initialState: initialUserState
});


export const {} = userSlice.actions;
export default userSlice.reducer;