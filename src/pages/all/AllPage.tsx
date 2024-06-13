import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'hooks/redux/useRedux';

import Enter from '../../components/quiz/Enter';
import Data from './aboutData/Data';
import ResetBtn from 'components/common/ResetBtn';

import { selectSheet } from 'store/modules/sheetStackSlice';

/** 24/06/09 - all Sheet about stack */
export default function AllPage() {
  const [stack, setStack] = useState<string | null>(null);
  const [displayWelcome, setDisplayWelcome] = useState(true);

  const navi = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (stack) {
      // display timer with change page
      const timer = setTimeout(() => {
        setDisplayWelcome((prev) => !prev);
        navi(`/all/${stack}`);
      }, 1000);
      // set global state stack
      dispatch(selectSheet(stack));

      return () => clearTimeout(timer);
    }
  }, [stack]);

  return (
    <section className='relative flex flex-col justify-center items-center w-full'>
      <Routes>
        <Route
          path='/'
          element={
            displayWelcome && (
              <Enter category={stack} setCategory={setStack}>
                <h2 className='text-xl font-black'>모아보기 할 데이터를 가져옵니다.</h2>
              </Enter>
            )
          }
        ></Route>
        <Route path={`/:stack`} element={<Data stack={stack} />} />
      </Routes>
      {/* reset stack */}
      <ResetBtn name='all' setDisplay={setDisplayWelcome} setStack={setStack} />
    </section>
  );
}
