import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type Login = {
  id: string;
  code: number;
};

const initialState: Login = {
  id: '',
  code: 0,
};

export const loginSlice = createSlice({
  name: 'loginSlice',
  initialState,
  reducers: {
    login: (state: Login, action: PayloadAction<Login>) => ({
      ...state,
      ...action.payload,
    }),
    logout: () => initialState,
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice;
