export type SetUserActionPayload = {
  id?: string;
  name?: string;  
  email?: string;
  aboutMe?: string;
  avatar?: string;
  token?: string;  
};

export type SetUserAction = {
  payload: SetUserActionPayload;
};