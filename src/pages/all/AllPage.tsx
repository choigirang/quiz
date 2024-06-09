import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux/useRedux';

import Enter from '../../components/common/quiz/Enter';
import Data from './Data';

import { selectSheet } from 'store/modules/sheetStackSlice';

import { CategroyState } from '../../type/quiz';
import { Route, Routes, useNavigate } from 'react-router-dom';

/** 24/06/09 - all Sheet about stack */
export default function AllPage() {
  const [category, setCategory] = useState<CategroyState>({
    stack: '',
    display: true,
  });

  const navi = useNavigate();

  const dispatch = useAppDispatch();
  const sheetStack = useAppSelector((state) => state.sheetStackSlice);

  useEffect(() => {
    if (sheetStack.stack !== '') {
      setCategory({ stack: sheetStack.stack, display: false });
      navi(`/all/${sheetStack.stack}`);
    }

    if (category.stack) {
      // display timer with change page
      const timer = setTimeout(() => {
        setCategory((prev) => ({ ...prev, display: false }));
      }, 1000);
      // set global state stack
      dispatch(selectSheet(category.stack));
      navi(`/all/${category.stack}`);

      return () => clearTimeout(timer);
    }
  }, [category.stack]);

  return (
    <section className='flex flex-col justify-center items-center w-full'>
      {!sheetStack && category.display && (
        <Enter category={category.stack} setCategory={setCategory}>
          <h2 className='text-xl font-black'>
            모아보기 할 데이터를 가져옵니다.
          </h2>
        </Enter>
      )}
      <Routes>
        <Route
          path={`/${category.stack}`}
          element={<Data stack={category.stack} />}
        />
      </Routes>
    </section>
  );
}
