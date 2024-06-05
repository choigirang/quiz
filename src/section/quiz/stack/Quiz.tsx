import { useEffect, useState } from 'react';
import useCheckUser from '../../../hooks/useCheckUser';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux/useRedux';
import Question from './Question';
import { useParams } from 'react-router-dom';
import { QuizData } from '../../../type/quiz';
import { quiz } from '../../../store/modules/quizSlice';

/** 24/06/02 - random quiz page */
export default function Quiz() {
  const [data, setData] = useState<QuizData[]>();
  // move page when user direct page
  const {} = useCheckUser('/quiz');
  // selected stack
  const { stack } = useParams();
  // redux
  const dispatch = useAppDispatch();

  // setting redux data with selected data
  useEffect(() => {
    const settingData = async () => {
      try {
        // dynamic import by selected stack
        const quizModule = await import(`../../../assets/quiz/${stack}`);
        const quizData: QuizData[] = quizModule.default;
        setData(quizData);
        dispatch(quiz(quizData));
      } catch (error) {
        console.error('Failed to load quiz data:', error);
      }
    };

    if (stack) {
      settingData();
    }
  }, []);

  return (
    <section className='w-full flex justify-center items-center'>
      {data ? (
        <Question allQuiz={data} />
      ) : (
        <div>서버 오류로 불러온 데이터가 없습니다.</div>
      )}
    </section>
  );
}
