import React, { SetStateAction, useEffect, useState } from 'react';
import { useAppSelector } from '../../../hooks/redux/useRedux';

import UserRank from './UserRank';
import Pagination from './Pagination';

import { RankData } from '../../../type/quiz';

type RankProps = {
  ranking: RankData[] | undefined;
  total: number | undefined;
  page: number;
  stack: string | undefined;
  setPage: React.Dispatch<SetStateAction<number>>;
};

/** 24/06/08 - Ranking page */
export default function Rank({ ranking, total, stack, page, setPage }: RankProps) {
  // rank data
  const [rank, setRank] = useState<RankData[]>([]);
  // login user
  const user = useAppSelector((state) => state.loginSlice.id);

  //  ranking data & stack set
  useEffect(() => {
    if (ranking) {
      setRank(ranking);
    }
  }, [ranking]);

  if (!rank) return <div>데이터를 불러오고 있습니다.</div>;

  return (
    <main className='flex flex-col gap-3 h-full items-center'>
      {/* ranking */}
      <table className='w-[500px]'>
        <thead>
          <tr>
            {['순위', '아이디', '점수'].map((each) => (
              <th key={`thead ${each}`} className='w-1/3 border px-2 py-1 bg-yellow-500 text-white'>
                {each}
              </th>
            ))}
          </tr>
        </thead>
        {/* ranking data */}
        <tbody>
          {rank.length !== 0 ? (
            rank.map(([key, value], idx) => (
              <tr key={`thead ${key}`}>
                <td className='border px-2 py-1 text-center'>{idx + (page - 1) * 10 + 1}</td>
                <td className='border px-2 py-1 text-center'>{key}</td>
                <td className='border px-2 py-1 text-center'>{value}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className='text-center py-1'>
                데이터가 존재하지 않습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* pagination */}
      {total !== 0 && total && <Pagination setPage={setPage} rankLeng={total} />}
      {/* user rank info */}
      {user && <UserRank user={user} stack={stack} />}
    </main>
  );
}
