import React, { useEffect, useState } from 'react';
import { QuizData } from '../../../type/quiz';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/redux/useRedux';

type QuizResultProps = {
  quizes: QuizData[];
};

/** 24/06/05 - show quiz result, fetch firebase result*/
export default function QuizResult({ quizes }: QuizResultProps) {
  const [result, setResult] = useState({ total: 0, correct: 0 });
  const user = useAppSelector((state) => state.loginSlice);

  useEffect(() => {
    // calculate total Q / correct A
    const calculate = () => {
      const Qlength = quizes.length;
      // correct A
      const correct = quizes.map(
        (each: QuizData) => each.state === true
      ).length;

      setResult({ total: Qlength, correct });
    };

    calculate();
  }, []);

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
              {String(Math.floor((result.total / result.correct) * 100))}%
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <Link
          to={'/quiz'}
          className='px-2 py-2 bg-yellow-400 text-white font-black rounded-sm hover:bg-yellow-500 transition-default'
        >
          메인으로 이동
        </Link>
      </div>
    </div>
  );
}
