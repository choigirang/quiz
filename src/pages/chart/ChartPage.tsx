import { useEffect, useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import useRank from '../../hooks/useApi/useRank';

import Rank from './rank/Rank';
import Graph from './graph/Graph';

import { RankData } from '../../type/quiz';
import { stackCategory } from '../../assets/quiz';

const link = {
  랭킹: { link: '/chart' },
  그래프: { link: '/chart/graph' },
};

/** 24/06/08 - all chart page with data*/
export default function ChartPage() {
  // ranking data
  const [ranking, setRanking] = useState<RankData[]>();
  // selected stack
  const [stack, setStack] = useState<string>('');
  // page
  const [page, setPage] = useState(1);
  const { data: rank, refetch } = useRank(page, stack);
  const path = useLocation().pathname;

  // select stack with refetch data by stack
  const stackHandler = async (stack: string) => {
    await setStack(stack);
    refetch().then((res) => {
      setRanking(res.data?.ranking);
    });
  };

  useEffect(() => {
    setRanking(rank?.ranking);
    if (rank?.stack) setStack(rank.stack);
  }, [rank]);

  useEffect(() => {
    refetch().then((res) => {
      setRanking(res.data?.ranking);
    });
  }, [page]);

  return (
    <section className='flex flex-col justify-start items-center gap-1 w-full py-5'>
      <div className='flex justify-around items-center w-[300px] h-[50px]'>
        {/* category */}
        {Object.entries(link).map(([key, value]) => (
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
        {Object.keys(stackCategory).map((each) => (
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
