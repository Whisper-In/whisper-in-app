export type UserState = {
  id: string;
  name: string;
  avatar?: string;
  email?: string;
};

export const initialUserState: UserState = {
  id: "646b85083abea58b84fbfa6f",
  name: "",
  avatar: "",
  email: "",
};
