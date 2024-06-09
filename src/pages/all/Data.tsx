import { ArrowDownCircleIcon, PlayIcon } from '@heroicons/react/24/outline';
import { useAppDispatch, useAppSelector } from 'hooks/redux/useRedux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizData } from 'type/quiz';

type DataProps = {
  stack: string | null;
};

type DesData = {
  [key: string]: string[];
};

/** 24/06/09 - get selected sheet data */
export default function Data({ stack }: DataProps) {
  const [data, setData] = useState<DesData>();
  const [isClick, setIsClick] = useState<number>();
  const sheet = useAppSelector((state) => state.sheetStackSlice).stack;
  const navi = useNavigate();

  const clickHandler = (e: number) => {
    if (e === isClick) {
      setIsClick(undefined);
    } else {
      setIsClick(e);
    }
  };

  useEffect(() => {
    // user direct URL
    if (!stack && !sheet) {
      alert('잘못된 접근입니다.');
      return navi('/all');
    }

    const getData = async () => {
      const data = await import(`assets/quiz/${stack ? stack : sheet}`);
      const des: QuizData[] = data.default;
      const reData: DesData = {};

      des.map((each) => {
        reData[each.title] = [...each.des];
      });

      await setData(reData);
    };

    getData();
  }, [stack]);

  if (!data) return <div>서버 오류입니다.</div>;

  return (
    <ul className='w-full h-full p-20'>
      {Object.keys(data).map((each, idx) => (
        <li
          onClick={() => clickHandler(idx)}
          key={`data list ${each}`}
          className='flex justify-between items-center px-5 py-2 font-black text-defaultBlack bg-defaultWhite border-2 rounded cursor-pointer'
        >
          <span>{each}</span>
          <PlayIcon
            fill='gray'
            className={`${isClick === idx ? '-rotate-90' : 'rotate-90'} transition-default`}
            width={20}
            height={20}
          />
        </li>
      ))}
    </ul>
  );
}
