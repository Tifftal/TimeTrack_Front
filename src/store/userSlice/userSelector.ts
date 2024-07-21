import { RootState } from "./userSlice";

export const selectUserState = (state: RootState) => {
  return state.user;
};
