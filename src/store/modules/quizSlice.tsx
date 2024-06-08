import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { InitStack, QuizData } from '../../type/quiz';

const initialState: QuizData[] = [];

export const quizSlice = createSlice({
  name: 'quizSlice',
  initialState,
  reducers: {
    quiz: (state, action: PayloadAction<QuizData[]>) => {
      return action.payload;
    },
    answer: (
      state: QuizData[],
      action: PayloadAction<{ num: number; answer: number }>
    ) => {
      const { num, answer } = action.payload;
      const quizItem = state.find((quiz) => quiz.num === num);
      if (quizItem) {
        quizItem.state = quizItem.done = true;
        quizItem.state = quizItem.correct === answer;
      }
    },
    resetQuiz: () => initialState,
  },
});

export const { quiz, answer, resetQuiz } = quizSlice.actions;
export default quizSlice;
