import React, { SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks/redux/useRedux';

import { resetQuiz } from 'store/modules/quizSlice';
import { resetStack } from 'store/modules/quizStackSlice';
import { resetSheet } from 'store/modules/sheetStackSlice';

import { ArrowPathIcon } from '@heroicons/react/24/outline';

type ResetProps = {
  name: string;
  setStack?: React.Dispatch<SetStateAction<string | null>>;
  setDisplay?: React.Dispatch<SetStateAction<boolean>>;
};

/** 24/06/10 - reset btn */
export default function ResetBtn({ name, setStack, setDisplay }: ResetProps) {
  // reset tooltip
  const [tooltip, setTooltip] = useState(false);
  // navi
  const navi = useNavigate();
  const dispatch = useAppDispatch();

  const { stack } = useAppSelector((state) => state.selectStackSlice);
  const { stack: sheet } = useAppSelector((state) => state.sheetStackSlice);

  const reset = () => {
    if (name === 'quiz' && stack) {
      dispatch(resetStack());
      dispatch(resetQuiz());
      navi(`/quiz`);
    } else if (name === 'all' && sheet) {
      dispatch(resetSheet());
      if (setStack) setStack(null);
      if (setDisplay) {
        setDisplay(true);
      }
      navi(`/all`);
    }
  };

  return (
    <div
      onClick={reset}
      onMouseEnter={() => setTooltip(true)}
      onMouseLeave={() => setTooltip(false)}
      className='absolute flex justify-center items-center p-1 right-5 bottom-5 bg-defaultYellow rounded-lg cursor-pointer'
    >
      <div
        className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap bg-defaultYellow text-defaultGreen px-2 py-1 transition-default rounded ${tooltip ? 'opacity-100 -top-8' : 'opacity-0 -top-4'} -z-10`}
      >
        초기화
      </div>
      <ArrowPathIcon
        width={24}
        height={24}
        className={`text-defaultGreen ${tooltip && 'animate-spin'}`}
      />
    </div>
  );
}
