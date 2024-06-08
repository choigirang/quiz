import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux/useRedux';
import useCheckUser from '../../../hooks/useCheckUser';

import Question from './Question';

import { QuizData } from '../../../type/quiz';
import { quiz, resetQuiz } from '../../../store/modules/quizSlice';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { resetStack } from '../../../store/modules/quizStackSlice';

/** 24/06/02 - random quiz page */
export default function Quiz() {
  const [data, setData] = useState<QuizData[]>();
  // move page when user direct page
  const {} = useCheckUser('/quiz');
  // selected stack
  const { stack } = useParams();
  // redux
  const dispatch = useAppDispatch();
  const alreadyQuiz = useAppSelector((state) => state.quizSlice);
  // navi
  const navi = useNavigate();
  // reset quiz & selected stack
  const reset = () => {
    dispatch(resetStack());
    dispatch(resetQuiz());
    navi('/quiz');
  };

  const shuffle = (array: QuizData[]) => {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[randomIndex]] = [
        shuffledArray[randomIndex],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  // setting redux data with selected data
  useEffect(() => {
    const settingData = async () => {
      try {
        // if already redux set quiz data
        if (alreadyQuiz.length !== 0) {
          setData(alreadyQuiz);
        } else {
          // dynamic import by selected stack
          const quizModule = await import(`../../../assets/quiz/${stack}`);
          const quizData: QuizData[] = Array.isArray(quizModule.default)
            ? quizModule.default
            : [quizModule.default];

          const shuffledData = shuffle(quizData);
          setData(shuffledData);
          dispatch(quiz(quizData));
        }
      } catch (error) {
        console.error('Failed to load quiz data:', error);
      }
    };

    if (stack) {
      settingData();
    }
  }, [stack]);

  return (
    <section className='w-full flex justify-center items-center'>
      {data ? (
        <Question data={data} setData={setData} />
      ) : (
        <div>서버 오류로 불러온 데이터가 없습니다.</div>
      )}
      {/* reset quiz */}
      <button
        type='button'
        onClick={reset}
        className='absolute w-6 h-6 right-5 bottom-5 transition-default hover:animate-spin hover:text-yellow-400'
      >
        <ArrowPathIcon />
      </button>
    </section>
  );
}
