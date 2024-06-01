import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { LoginData } from '../../type/login';

const initialState: LoginData = {
  id: '',
  code: '',
};

export const loginSlice = createSlice({
  name: 'loginSlice',
  initialState,
  reducers: {
    login: (state: LoginData, action: PayloadAction<LoginData>) => ({
      ...state,
      ...action.payload,
    }),
    logout: () => initialState,
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice;
