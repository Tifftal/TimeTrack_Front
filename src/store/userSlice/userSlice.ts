import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createReduxHookFactory } from "../createReduxHookFactory";
import { SliceActions } from "../sliceActions";

export type UserType = {
  id: string,
  username: string,
  middleName: string,
  name: string,
  userType: string,
  surname: string;
}

const initialState: UserType = {
  id: '',
  username: '',
  middleName: '',
  name: '',
  userType: '',
  surname: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      Object.assign(state, action.payload);
    }
  }
});

export const {
  setUser,
} = userSlice.actions;

export const userReducer = userSlice.reducer;

export type RootState = {
  [userSlice.name]: UserType;
};

export const { useSelector, useDispatch } = createReduxHookFactory<
  RootState,
  SliceActions<typeof userSlice.actions>
>();
