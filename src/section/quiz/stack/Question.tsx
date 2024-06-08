import React, { SetStateAction, useEffect, useState } from 'react';
import QuizResult from './QuizResult';

import { useAppDispatch } from '../../../hooks/redux/useRedux';
import { answer, resetQuiz } from '../../../store/modules/quizSlice';

import { QuizData } from '../../../type/quiz';

type QuizProps = {
  data: QuizData[];
  setData: React.Dispatch<SetStateAction<QuizData[] | undefined>>;
};

/** 24/06/05 - random quiz */
export default function Question({ data, setData }: QuizProps) {
  // quiz set
  const [curQuiz, setCurQuiz] = useState<QuizData>();
  // user selected
  const [selectedNum, setSelectedNum] = useState<number>(0);
  // complete quiz
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  // quiz
  const dispatch = useAppDispatch();

  // next quiz set
  const nextQuiz = () => {
    if (!curQuiz) return;
    // init select
    setSelectedNum(0);

    // add redux with quiz
    dispatch(answer({ num: curQuiz.num, answer: selectedNum }));

    // change quizes correct answer
    setData(
      (prevQuizes) =>
        prevQuizes &&
        prevQuizes.map((quiz) => {
          if (quiz.num === curQuiz.num) {
            const isCorrect = quiz.correct === selectedNum;
            return { ...quiz, state: isCorrect, done: true };
          }
          return quiz;
        })
    );
  };

  // if quiz done, change complete
  useEffect(() => {
    const allDoneQuiz = data.find((each) => each.done === false);

    if (allDoneQuiz) {
      setCurQuiz(data.find((each) => each.done === false));
    } else {
      dispatch(resetQuiz());
      setIsQuizComplete((prev) => !prev);
    }
  }, [data]);

  if (isQuizComplete) {
    return <QuizResult data={data} />;
  }

  if (!curQuiz) return <div>서버 에러입니다.</div>;

  return (
    <ul className='flex flex-col gap-3 text-md'>
      {/* title */}
      <li className='font-black text-center'>Q : {curQuiz.title}</li>
      <li>
        {/* Q list */}
        <ul>
          {Object.values(curQuiz.Q).map((value, idx) => (
            <li
              key={`Q ${value}`}
              onClick={() => setSelectedNum(idx + 1)}
              className={`px-2 py-1 rounded transition-default cursor-pointer hover:bg-yellow-400 hover:text-white ${selectedNum === idx + 1 && `bg-yellow-400`}`}
            >
              {idx + 1} : {value}
            </li>
          ))}
        </ul>
      </li>
      {/* submit */}
      <li
        className='max-w-[200px] px-2 py-1 border border-gray-200 rounded cursor-pointer text-center transition-default hover:bg-yellow-400 hover:text-white'
        onClick={nextQuiz}
      >
        제출
      </li>
    </ul>
  );
}
