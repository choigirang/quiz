import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux/useRedux';
import useFetchResult from '../../../hooks/useApi/useFetchResult';

import { QuizData } from '../../../type/quiz';
import { resetQuiz } from '../../../store/modules/quizSlice';
import { resetStack } from '../../../store/modules/quizStackSlice';

type QuizResultProps = {
  data: QuizData[];
};

/** 24/06/05 - show quiz result, fetch firebase result*/
export default function QuizResult({ data }: QuizResultProps) {
  const [result, setResult] = useState({ total: 0, correct: 0, percent: 0 });
  const id = useAppSelector((state) => state.loginSlice);
  const stack = useAppSelector((state) => state.selectStackSlice);
  // data fetching to firebase
  const { mutation } = useFetchResult(stack.stack, id.id, result.percent);
  const navigate = useNavigate();
  // redux
  const dispatch = useAppDispatch();

  useEffect(() => {
    // calculate total Q / correct A
    const calculate = () => {
      const Qlength = data.length;
      // correct A
      const correct = data
        .map((each: QuizData) => each.state === true)
        .filter((each) => each === true).length;
      const percent = Qlength > 0 ? Math.floor((correct / Qlength) * 100) : 0;

      setResult({ total: Qlength, correct, percent });
    };

    calculate();
  }, []);

  const submitWithHome = async () => {
    dispatch(resetStack());

    await mutation.mutate();
    navigate('/quiz');
  };

  const title = ['총 문제', '정답 개수', '퍼센트'];

  return (
    <div className='flex flex-col items-center gap-5 w-full'>
      <table className='w-full text-center'>
        {/* title */}
        <thead className='flex justify-center w-full'>
          <tr className='w-[70%] flex border border-neutral-200'>
            {title.map((each) => (
              <th
                className='w-1/3 px-2 py-2 border-e border-neutral-200 bg-yellow-400'
                key={`table ${each}`}
                scope='col'
              >
                {each}
              </th>
            ))}
          </tr>
        </thead>
        {/* content */}
        <tbody className='flex justify-center w-full'>
          <tr className='w-[70%] flex border border-neutral-200'>
            <td className='w-1/3 px-2 py-2 border-e border-neutral-200'>
              {result.total}
            </td>
            <td className='w-1/3 px-2 py-2 border-e border-neutral-200'>
              {result.correct}
            </td>
            <td className='w-1/3 px-2 py-2 border-e border-neutral-200'>
              {result.percent}%
            </td>
          </tr>
        </tbody>
      </table>
      <div
        onClick={submitWithHome}
        className='px-2 py-2 bg-yellow-400 text-white font-black rounded-sm hover:bg-yellow-500 transition-default'
      >
        메인으로 이동
      </div>
    </div>
  );
}
