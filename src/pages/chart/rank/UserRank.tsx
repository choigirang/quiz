import React, { useEffect, useState } from 'react';
import useRankWithUser from '../../../hooks/useApi/useRankWithUser';

type UserScoreType = {
  score: number;
  rank: number;
};

/** 24/06/09 - user rank info with stack */
export default function UserRank({ user, stack }: { user: string; stack: string | undefined }) {
  // user rank & score
  const [userScore, setUserScore] = useState<UserScoreType>({
    score: 0,
    rank: 0,
  });
  // get user data
  const { refetch } = useRankWithUser(user, stack);
  // user score & user ranking set
  useEffect(() => {
    const fetchUserScore = async () => {
      if (!user) return;

      const res = await refetch();
      if (res.data && res.data.rank && res.data.score) {
        setUserScore({ ...res.data });
      } else {
        setUserScore({ score: 0, rank: 0 });
      }
    };

    fetchUserScore();
  }, [stack]);

  return (
    <React.Fragment>
      {/* user data */}
      {userScore.rank !== 0 && userScore.score !== 0 && (
        <div>
          <span className='font-black text-yellow-500'>{`${user}`}</span>님의 점수는{' '}
          <span className='font-black text-yellow-500'>{`${userScore.score}`}</span>
          점이며,
          <br></br>
          <span className='font-black text-yellow-500'>{`${userScore.rank}`}</span>등 입니다.
        </div>
      )}
    </React.Fragment>
  );
}
