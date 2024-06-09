import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'hooks/redux/useRedux';
import useCheckUser from 'hooks/useCheckUser';

import Question from './aboutQuiz/Question';

import { QuizData } from 'type/quiz';
import { resetStack } from 'store/modules/quizStackSlice';

import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { quiz, resetQuiz } from 'store/modules/quizSlice';

/** 24/06/02 - random quiz page */
export default function QuizPage() {
  const [data, setData] = useState<QuizData[]>();
  // reset tooltip
  const [tooltip, setTooltip] = useState(false);
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
          const quizModule = await import(`assets/quiz/${stack}`);
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
      <div className='absolute right-5 bottom-5'>
        <div
          className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap bg-defaultYellow text-white px-2 py-1 transition-default rounded ${tooltip ? 'opacity-100 -top-8' : 'opacity-0 -top-4'}`}
        >
          초기화
        </div>
        <button
          type='button'
          onClick={reset}
          onMouseEnter={() => setTooltip(true)}
          onMouseLeave={() => setTooltip(false)}
          className='w-6 h-6 transition-default'
        >
          <ArrowPathIcon className='hover:animate-spin hover:text-yellow-400' />
        </button>
      </div>
    </section>
  );
}
