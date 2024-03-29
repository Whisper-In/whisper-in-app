import { AppState } from "../states/app";

export const setIsLoadingReducer = (
  state: AppState,
  action: { payload: boolean }
) => {
  state.isLoading = action.payload;
  return state;
};

export const setDarkModeReducer = (
  state: AppState,
  action: { payload: boolean }
) => {
  state.darkMode = action.payload;
  return state;
}

export const setCurrentPlayingSoundURLReducer = (
  state: AppState,
  action: { payload: string | undefined}
) => {
  state.currentPlayingSoundURL = action.payload;

  return state;
}