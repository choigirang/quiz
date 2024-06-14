import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import useRank from '../../hooks/useApi/useRank';
import useMobile from 'hooks/useMobile';

import Rank from './rank/Rank';
import Graph from './graph/Graph';

import { RankData } from '../../type/quiz';
import { stackCategory } from '../../assets/quiz';

/** 24/06/08 - all chart page with data*/
export default function ChartPage() {
  // ranking data
  const [ranking, setRanking] = useState<RankData[]>();
  // selected stack
  const [stack, setStack] = useState<string>('');
  // page
  const [page, setPage] = useState(1);
  const { isMobile } = useMobile();
  const { data: rank, refetch } = useRank(page, stack);
  const path = useLocation().pathname;

  // select stack with refetch data by stack
  const stackHandler = useCallback(
    async (stack: string) => {
      await setStack(stack);
      refetch().then((res) => {
        setRanking(res.data?.ranking);
      });
    },
    [stack]
  );

  useEffect(() => {
    setRanking(rank?.ranking);
  }, [rank]);

  const link = useMemo(
    () => Object.entries({ 랭킹: { link: '/chart' }, 그래프: { link: '/chart/graph' } }),
    []
  );

  const stackKeys = useMemo(() => Object.keys(stackCategory), []);

  return (
    <section
      className={`flex flex-col justify-start items-center w-full py-5 ${isMobile ? 'px-5 gap-5' : 'gap-1'}`}
    >
      <div className='flex justify-around items-center w-[300px] h-[50px]'>
        {/* category */}
        {link.map(([key, value]) => (
          <Link
            key={`chart ${key}`}
            to={value.link}
            className={`${path === value.link ? 'text-yellow-400 font-bold' : ''}`}
          >
            {key}
          </Link>
        ))}
      </div>
      {/* stack */}
      <ul className='flex gap-2'>
        {stackKeys.map((each) => (
          <li
            key={`${each} in rank`}
            onClick={() => stackHandler(each)}
            className={`${stack === each && 'text-white font-bold bg-yellow-400 rounded'} py-1 px-2 cursor-pointer`}
          >
            {each.charAt(0).toUpperCase() + each.slice(1)}
          </li>
        ))}
      </ul>
      {/* page */}
      <Routes>
        <Route
          path='/'
          element={
            <Rank
              ranking={ranking}
              page={page}
              stack={stack}
              total={rank?.total}
              setPage={setPage}
            />
          }
        />
        <Route path='/graph' element={<Graph stack={stack} />} />
      </Routes>
    </section>
  );
}
