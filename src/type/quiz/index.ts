/** 24/06/01 - quiz category data */
export type SelectQuizCategory =
  | 'html'
  | 'css'
  | 'js'
  | 'ts'
  | 'react'
  | 'next'
  | 'cs';

/** 24/06/01 - quiz category in Enter */
/** 24/06/01 - quiz category in Enter */
export type CategoryData = {
  [key in SelectQuizCategory]: {
    name: string;
    color: string;
  };
};
