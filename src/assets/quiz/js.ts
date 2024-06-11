import { QuizData } from '../../type/quiz';

const quiz: Omit<QuizData, 'num'>[] = [
  {
    title: '자바스크립트?',
    Q: { 1: 'A programming language', 2: 'A type of food', 3: 'A car brand' },
    state: false,
    correct: 1,
    done: false,
    des: ['예시 설명입니다.', '예시 설명입니다.', '예시 설명입니다.', '예시 설명입니다.'],
  },
  {
    title: '자바스크립트?',
    Q: { 1: 'A programming language', 2: 'A type of food', 3: 'A car brand' },
    state: false,
    correct: 1,
    done: false,
    des: ['예시 설명입니다.', '예시 설명입니다.', '예시 설명입니다.', '예시 설명입니다.'],
  },
];

const generateQuizData = (data: Omit<QuizData, 'num'>[]): QuizData[] => {
  return data.map((item, index) => ({
    ...item,
    num: index + 1,
  }));
};

const jsQuiz: QuizData[] = generateQuizData(quiz);

export default jsQuiz;
