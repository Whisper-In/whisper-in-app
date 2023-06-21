import { SetUserAction } from "../slices/user/types";
import { UserState } from "../states/userState";

export const loadUser = (state: UserState, action: any) => {
  return state;
};

export const setUserReducer = (state: UserState, action: SetUserAction) => {
  if(action.payload.token)
    state.token = action.payload.token;
    
  state.me = {
    id: action.payload.id ?? state.me!.id,
    name: action.payload.name,
    aboutMe: action.payload.aboutMe,
    email: action.payload.email,
    avatar: action.payload.avatar,
  };

  return state;
};

export const logoutUserReducer = (state: UserState) => {
  state.token = undefined;
  state.me = undefined;

  return state;
};
