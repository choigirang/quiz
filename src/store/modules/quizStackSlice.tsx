import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { InitStack } from '../../type/quiz';

const initialState: InitStack = {
  stack: '',
};

export const selectStackSlice = createSlice({
  name: 'selectStackSlice',
  initialState,
  reducers: {
    selectStack: (state: InitStack, action: PayloadAction<InitStack>) => ({
      ...state,
      ...action.payload,
    }),
    resetStack: () => initialState,
  },
});

export const { selectStack, resetStack } = selectStackSlice.actions;
export default selectStackSlice;
