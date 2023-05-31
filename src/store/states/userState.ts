export type UserProfile = {
  id: string;
  name: string;
  avatar?: string;
  email?: string;
}

export type UserState = {
  me?: UserProfile;
  token?:string;  
  isAuthenticated?:boolean;
};

export const initialUserState: UserState = {
  isAuthenticated: false
};
