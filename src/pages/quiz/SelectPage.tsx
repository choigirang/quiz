import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux/useRedux';

import Login from '../../components/common/login/Login';
import Enter from '../../components/quiz/Enter';

import { selectStack } from '../../store/modules/quizStackSlice';

/** 24/06/02 - /quiz page (login & select stack) */
export default function SelectPage() {
  // select quiz
  const [stack, setStack] = useState<string | null>(null);
  const [displayWelcome, setDisplayWelcome] = useState(true);
  // check login user
  const user = useAppSelector((state) => state.loginSlice);

  // move page
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (stack) {
      const timer = setTimeout(() => {
        setDisplayWelcome(false);
        navigate(`/quiz/${stack}`);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [stack, navigate]);

  const handleStackSelect = (selectedStack: string) => {
    setStack(selectedStack);
    dispatch(selectStack(selectedStack));
  };

  return (
    <section className='flex flex-col justify-center items-center w-full'>
      {!(user.code || user.id) && <Login />}
      {user.id && displayWelcome && (
        <Enter category={stack} setCategory={handleStackSelect}>
          <h2 className='text-xl font-black'>환영합니다.</h2>
        </Enter>
      )}
    </section>
  );
}
