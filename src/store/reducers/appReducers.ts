import { AppState } from "../states/app";

export const setIsLoadingReducer = (
  state: AppState,
  action: { payload: boolean }
) => {
  state.isLoading = action.payload;
  return state;
};
