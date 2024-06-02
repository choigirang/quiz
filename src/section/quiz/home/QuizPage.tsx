import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux/useRedux';

import Login from '../../../components/common/login/Login';
import Enter from './Enter';

import { SelectQuizCategory } from '../../../type/quiz';
import { selectStack } from '../../../store/modules/quizStackSlice';
import { useNavigate } from 'react-router-dom';

export type CategroyState = {
  stack: SelectQuizCategory | null;
  display: boolean;
};

/** 24/06/02 - /quiz page (login & select stack) */
export default function QuizPage() {
  // select quiz
  const [category, setCategory] = useState<CategroyState>({
    stack: null,
    display: true,
  });
  // check login user
  const user = useAppSelector((state) => state.loginSlice);

  // move page
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (category.stack) {
      // display timer with change page
      const timer = setTimeout(() => {
        setCategory((prev) => ({ ...prev, display: false }));
        navigate(`/quiz/${category.stack}`);
      }, 1000);
      // set global state stack
      dispatch(selectStack({ stack: category.stack }));

      return () => clearTimeout(timer);
    }
  }, [category.stack, dispatch]);

  return (
    <section className='flex flex-col justify-center items-center w-full'>
      {!(user.code || user.id) && <Login />}
      {user.id && category.display && <Enter setCategory={setCategory} />}
    </section>
  );
}
