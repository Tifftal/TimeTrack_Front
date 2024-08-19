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
  userInventory: UserInventory;
  userStatistics: UserStatistics;
}

export type UserInventory = {
  diamonds: number;
  freezing: number;
}

export type UserStatistics = {
  freezeStatus: string;
  freezeTill: string;
  durationOfShockMode: number;
}

const initialState: UserType = {
  id: '',
  username: '',
  middleName: '',
  name: '',
  userType: '',
  surname: '',
  userInventory: {
    diamonds: 0,
    freezing: 0,
  },
  userStatistics: {
    freezeStatus: '',
    freezeTill: '',
    durationOfShockMode: 0
  }
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      Object.assign(state, action.payload);
    },
    addFreeze: (state) => {
      state.userInventory.freezing += 1;
      state.userInventory.diamonds -= 200;
    },
    removeFreeze: (state) => {
      state.userInventory.freezing -= 1;
    },
  }
});

export const {
  setUser,
  addFreeze,
  removeFreeze
} = userSlice.actions;

export const userReducer = userSlice.reducer;

export type RootState = {
  [userSlice.name]: UserType;
};

export const { useSelector, useDispatch } = createReduxHookFactory<
  RootState,
  SliceActions<typeof userSlice.actions>
>();
