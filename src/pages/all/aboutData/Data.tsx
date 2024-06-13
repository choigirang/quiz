import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'hooks/redux/useRedux';

import EachDes from './EachDes';

import { QuizData } from 'type/quiz';

import { PlayIcon } from '@heroicons/react/24/outline';

type DataProps = {
  stack: string | null;
};

type DesData = {
  [key: string]: {
    title: string;
    des: string[];
  };
};

/** 24/06/09 - get selected sheet data */
export default function Data({ stack }: DataProps) {
  // title & des
  const [data, setData] = useState<DesData>();
  // click li
  const [isClick, setIsClick] = useState<string>();
  // inner H for set position top
  const refs = useRef<{ [key: string]: HTMLLIElement | null }>({});
  // prevent direct URL
  const sheet = useAppSelector((state) => state.sheetStackSlice).stack;
  const navi = useNavigate();

  const clickHandler = (e: string) => {
    setIsClick((prev) => (prev === e ? undefined : e));
  };

  // get data
  useEffect(() => {
    // user direct URL
    if (!stack && !sheet) {
      alert('잘못된 접근입니다.');
      return navi('/all');
    }

    const getData = async () => {
      const modulePath = `assets/quiz/${stack ? stack : sheet}`;
      const { default: des } = await import(modulePath);
      const reData: DesData = {};

      des.map((each: QuizData) => {
        reData[each.num] = { title: each.title, des: each.des };
      });

      await setData(reData);
    };

    getData();
  }, [stack]);

  if (!data) return <div>서버 오류입니다.</div>;

  return (
    <ul className='flex flex-col w-full h-full p-20 gap-3'>
      {Object.keys(data).map((each) => {
        const selected = isClick === each;
        return (
          <React.Suspense fallback={<li>데이터를 불러오고 있습니다.</li>} key={`data list ${each}`}>
            <li
              ref={(el) => (refs.current[each] = el)}
              onClick={() => clickHandler(each)}
              className={`relative flex flex-col justify-between items-center  font-black border-2 rounded cursor-pointer transition-default text-white ${selected ? ' bg-defaultGreen' : ' bg-defaultBlack'}`}
            >
              {/* title */}
              <div className='flex justify-between w-full px-5 py-2'>
                <span>{data[each].title}</span>
                <PlayIcon
                  fill='gray'
                  className={`${selected ? '-rotate-90' : 'rotate-90'} transition-default`}
                  width={20}
                  height={20}
                />
              </div>
              {/* des */}
              <EachDes selected={selected} data={data[each].des} />
            </li>
          </React.Suspense>
        );
      })}
    </ul>
  );
}
