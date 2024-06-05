import { useEffect, useState } from 'react';
import { QuizData } from '../../../type/quiz';
import QuizResult from './QuizResult';

type QuizProps = {
  allQuiz: QuizData[];
};

/** 24/06/05 - random quiz */
export default function Question({ allQuiz }: QuizProps) {
  // quiz set
  const [quizes, setQuizes] = useState(allQuiz);
  const [curQuiz, setCurQuiz] = useState<QuizData>();
  const [selectedNum, setSelectedNum] = useState<number>(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  // next quiz set
  const nextQuiz = () => {
    if (!curQuiz) return;
    // change quizes correct answer
    setQuizes((prevQuizes) =>
      prevQuizes.map((quiz) => {
        if (quiz.num === curQuiz.num) {
          const isCorrect = quiz.correct === selectedNum;
          return { ...quiz, state: isCorrect, done: true };
        }
        return quiz;
      })
    );
  };
  // random quiz set
  useEffect(() => {
    const randomNum = Math.floor(Math.random() * quizes.length);
    const randomQ = quizes[randomNum];
    setCurQuiz(randomQ);
  }, []);

  // if quiz done, change complete
  useEffect(() => {
    const lastQuiz = quizes.find((quiz) => !quiz.done);
    if (lastQuiz) {
      setCurQuiz(lastQuiz);
      setSelectedNum(0);
    } else {
      setIsQuizComplete(true);
    }
  }, [quizes]);

  if (isQuizComplete) {
    return <QuizResult quizes={quizes} />;
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
