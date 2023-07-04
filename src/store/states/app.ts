export type AppState = {
  isLoading: boolean;
  darkMode: boolean;
  currentPlayingSoundURL?: string;
};

export const initialAppState: AppState = {
  isLoading: false,
  darkMode: false,
  currentPlayingSoundURL: undefined
};
