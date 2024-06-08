import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { InitStack } from '../../type/quiz';

const initialState = {
  stack: '',
};

export const selectStackSlice = createSlice({
  name: 'selectStackSlice',
  initialState,
  reducers: {
    selectStack: (state, action: PayloadAction<string>) => {
      state.stack = action.payload;
    },
    resetStack: () => initialState,
  },
});

export const { selectStack, resetStack } = selectStackSlice.actions;
export default selectStackSlice;
