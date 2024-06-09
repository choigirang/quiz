import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux/useRedux';

import Login from '../../components/common/login/Login';
import Enter from '../../components/common/quiz/Enter';

import { CategroyState } from '../../type/quiz';
import { selectStack } from '../../store/modules/quizStackSlice';

/** 24/06/02 - /quiz page (login & select stack) */
export default function SelectPage() {
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
      dispatch(selectStack(category.stack));

      return () => clearTimeout(timer);
    }
  }, [category.stack, dispatch]);

  return (
    <section className='flex flex-col justify-center items-center w-full'>
      {!(user.code || user.id) && <Login />}
      {user.id && category.display && (
        <Enter category={category.stack} setCategory={setCategory}>
          <h2 className='text-xl font-black'>환영합니다.</h2>
        </Enter>
      )}
    </section>
  );
}
