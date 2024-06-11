import { QuizData } from '../../type/quiz';

const quiz: Omit<QuizData, 'num'>[] = [
  {
    title: '타입스크립트 1?',
    Q: { 1: 'A programming language', 2: 'A type of food', 3: 'A car brand' },
    state: false,
    correct: 1,
    done: false,
    des: [],
  },
  {
    title: '타입스크립트 2',
    Q: { 1: 'A programming language', 2: 'A type of food', 3: 'A car brand' },
    state: false,
    correct: 1,
    done: false,
    des: [],
  },
];

const generateQuizData = (data: Omit<QuizData, 'num'>[]): QuizData[] => {
  return data.map((item, index) => ({
    ...item,
    num: index + 1,
  }));
};

const tsQuiz: QuizData[] = generateQuizData(quiz);

export default tsQuiz;
