export type UserActionPayload = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  token: string;
};

export type SetUserAction = {
  payload: UserActionPayload;
};
