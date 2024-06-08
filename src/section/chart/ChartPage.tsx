import { useEffect, useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import useRank from '../../hooks/useApi/useRank';

import Rank from './Rank';
import Graph from './Graph';

import { RankData } from '../../type/quiz';

const link = {
  랭킹: { link: '/chart' },
  그래프: { link: '/chart/graph' },
};

/** 24/06/08 - all chart page with data*/
export default function ChartPage() {
  const [ranking, setRanking] = useState<RankData>();
  const { data: rank } = useRank();
  const path = useLocation().pathname;

  useEffect(() => {
    setRanking(rank);
  }, [rank]);

  return (
    <section className='flex flex-col justify-start items-center gap-3 w-full'>
      <div className='flex justify-around items-center w-[300px] h-[100px]'>
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
      {/* page */}
      <Routes>
        <Route path='/' element={<Rank ranking={ranking} />} />
        <Route path='/graph' element={<Graph />} />
      </Routes>
    </section>
  );
}
