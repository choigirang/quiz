/** 24/06/01 - quiz category data */
export type SelectQuizCategory =
  | 'html'
  | 'css'
  | 'js'
  | 'ts'
  | 'react'
  | 'next'
  | 'cs'
  | string;

/** 24/06/01 - quiz category in Enter */
export type CategoryData = {
  [key in SelectQuizCategory]: {
    name: string | null;
    color: string;
  };
};

/** 24/06/02 - selected quiz stack init data */
export type InitStack = {
  stack: SelectQuizCategory;
};

/** 24/06/02 - quiz data setting */
type Question = {
  [key: number]: string;
};

export type QuizData = {
  num: number;
  title: string;
  Q: Question;
  state: boolean;
  correct: number;
};
