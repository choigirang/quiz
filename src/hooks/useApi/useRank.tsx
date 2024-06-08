import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../utils/api/firebase';
import { useQuery } from 'react-query';
import { RankData } from '../../type/quiz';

async function getRank(): Promise<RankData> {
  const docRef = collection(db, 'rank');
  const rank = await getDocs(docRef);
  const rankData: RankData = {};

  rank.docs.forEach((doc) => {
    const stack = doc.id;
    const data = doc.data();

    rankData[stack] = {};
    Object.entries(data)
      .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
      .slice(0, 16)
      .forEach(([userId, score]) => {
        rankData[stack][userId] = score as number;
      });
  });

  return rankData;
}

/** 24/06/08 - get rank data query hooks */
export default function useRank() {
  const { data, isLoading, isSuccess, refetch } = useQuery(['rank'], () =>
    getRank()
  );

  return { data, isLoading, isSuccess };
}
