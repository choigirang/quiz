import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  stack: '',
};

export const sheetStackSlice = createSlice({
  name: 'sheetStackSlice',
  initialState,
  reducers: {
    selectSheet: (state, action: PayloadAction<string>) => {
      state.stack = action.payload;
    },
    resetSheet: () => initialState,
  },
});

export const { selectSheet, resetSheet } = sheetStackSlice.actions;
export default sheetStackSlice;
