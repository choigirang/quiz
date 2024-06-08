import React, { useEffect, useState } from 'react';

import UserRank from './UserRank';

import { RankData } from '../../type/quiz';

type RankProps = {
  ranking: RankData | undefined;
};

/** 24/06/08 - Ranking page */
export default function Rank({ ranking }: RankProps) {
  // rank data
  const [rank, setRank] = useState<RankData>();
  // select stack category
  const [stack, setStack] = useState<string>();

  //  ranking data & stack set
  useEffect(() => {
    if (ranking) {
      setRank(ranking);
      setStack(Object.keys(ranking)[0]);
    }
  }, [ranking]);

  if (!rank || !stack) return <div>데이터를 불러오고 있습니다.</div>;

  return (
    <React.Fragment>
      <ul className='flex gap-2'>
        {/* stack of rank */}
        {rank &&
          Object.keys(rank).map((each) => (
            <li
              key={`rank ${each}`}
              onClick={() => setStack(each)}
              className={`${stack === each && 'text-white font-bold bg-yellow-400 rounded'} py-1 px-2 cursor-pointer`}
            >
              {each.charAt(0).toUpperCase() + each.slice(1)}
            </li>
          ))}
      </ul>
      {/* ranking */}
      <table className='w-[500px]'>
        <thead>
          <tr>
            {['순위', '아이디', '점수'].map((each) => (
              <th
                key={`thead ${each}`}
                className='border px-2 py-1 bg-yellow-500 text-white'
              >
                {each}
              </th>
            ))}
          </tr>
        </thead>
        {/* ranking data */}
        <tbody>
          {Object.entries(rank[stack]).map(([key, value], idx) => (
            <tr key={`thead ${key}`}>
              <td className='border px-2 py-1 text-center'>{idx + 1}</td>
              <td className='border px-2 py-1 text-center'>{key}</td>
              <td className='border px-2 py-1 text-center'>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* user rank info */}
      <UserRank stack={stack}></UserRank>
    </React.Fragment>
  );
}
