import { SetUserAction } from "../slices/user/types";
import { UserState } from "../states/userState";

export const loadUser = (state:UserState, action: any) => {
  return state
}

export const setUserReducer = (state:UserState, action:SetUserAction) => {
  state.token = action.payload.token;
  state.me = {
    id: action.payload.id,
    name: action.payload.name,
    email: action.payload.email,
    avatar: action.payload.avatar
  }
  
  return state;
}