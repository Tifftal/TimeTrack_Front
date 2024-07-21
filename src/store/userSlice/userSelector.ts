import { RootState } from "./userSlice";

export const selectUserState = (state: RootState) => {
  return state.user;
};

export const selectUserType = (state: RootState) => {
  return selectUserState(state).userType;
}