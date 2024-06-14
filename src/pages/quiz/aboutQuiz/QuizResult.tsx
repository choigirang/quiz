import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux/useRedux';
import useFetchResult from '../../../hooks/useApi/useFetchResult';

import { resetStack } from '../../../store/modules/quizStackSlice';

import { QuizData } from '../../../type/quiz';

type QuizResultProps = {
  data: QuizData[];
};

const calculateResult = (data: QuizData[]) => {
  const Qlength = data.length;
  const correct = data.filter((quiz) => quiz.state === true).length;
  const percent = Qlength > 0 ? Math.floor((correct / Qlength) * 100) : 0;
  return { total: Qlength, correct, percent };
};

/** 24/06/05 - show quiz result, fetch firebase result*/
export default function QuizResult({ data }: QuizResultProps) {
  const id = useAppSelector((state) => state.loginSlice.id);
  const stack = useAppSelector((state) => state.selectStackSlice.stack);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Calculate result once on mount
  const { total, correct, percent } = calculateResult(data);

  // Fetch result mutation
  const { mutation } = useFetchResult(stack, id, percent);

  // Reset stack and navigate to '/quiz'
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
            <td className='w-1/3 px-2 py-2 border-e border-neutral-200'>{total}</td>
            <td className='w-1/3 px-2 py-2 border-e border-neutral-200'>{correct}</td>
            <td className='w-1/3 px-2 py-2 border-e border-neutral-200'>{percent}%</td>
          </tr>
        </tbody>
      </table>
      <div
        onClick={submitWithHome}
        className='px-2 py-2 bg-yellow-400 text-white font-black rounded-sm hover:bg-yellow-500 transition-default cursor-pointer'
      >
        메인으로 이동
      </div>
    </div>
  );
}
