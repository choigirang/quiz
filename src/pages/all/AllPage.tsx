import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'hooks/redux/useRedux';

import Enter from '../../components/quiz/Enter';
import Data from './aboutData/Data';
import ResetBtn from 'components/common/ResetBtn';

import { selectSheet } from 'store/modules/sheetStackSlice';

import { CategroyState } from '../../type/quiz';

/** 24/06/09 - all Sheet about stack */
export default function AllPage() {
  const [category, setCategory] = useState<CategroyState>({
    stack: '',
    display: true,
  });

  const navi = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (category.stack) {
      // display timer with change page
      const timer = setTimeout(() => {
        setCategory((prev) => ({ ...prev, display: false }));
        navi(`/all/${category.stack}`);
      }, 1000);
      // set global state stack
      dispatch(selectSheet(category.stack));

      return () => clearTimeout(timer);
    }
  }, [category.stack]);

  return (
    <section className='relative flex flex-col justify-center items-center w-full'>
      <Routes>
        <Route
          path='/'
          element={
            category.display && (
              <Enter category={category.stack} setCategory={setCategory}>
                <h2 className='text-xl font-black'>모아보기 할 데이터를 가져옵니다.</h2>
              </Enter>
            )
          }
        ></Route>
        <Route path={`/:stack`} element={<Data stack={category.stack} />} />
      </Routes>
      {/* reset stack */}
      <ResetBtn name='all' setDisplay={setCategory} />
    </section>
  );
}
