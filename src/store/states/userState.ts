export type UserProfile = {
  id: string;
  name?: string;
  aboutMe?: string;
  avatar?: string;
  email?: string;
  linkedAIProfile?: string;
}

export type UserState = {
  me?: UserProfile;
  token?: string;
  isAuthenticated?: boolean;
};

export const initialUserState: UserState = {
  isAuthenticated: false
};
