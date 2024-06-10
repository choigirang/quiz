import { useQuery } from 'react-query';

import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../../utils/api/firebase';

import { RankData } from '../../type/quiz';

type GetData = {
  ranking: RankData[];
  total: number;
  stack?: string;
};

async function getRank(page: number, stack: string | undefined): Promise<GetData> {
  // page with length (20)
  const startIdx = (page - 1) * 20;
  const endIdx = startIdx + 20;

  // if !select stack => set first doc id with doc data
  if (!stack) {
    const docRef = collection(db, 'rank');
    const rank = await getDocs(docRef);
    // first stack select
    const firstStack = doc(db, 'rank', rank.docs[0].id);
    const stackDoc = (await getDoc(firstStack)).data();

    if (!stackDoc) return { ranking: [], total: 0 };

    const ranking = Object.entries(stackDoc)
      .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
      .slice(startIdx, endIdx);

    return {
      ranking,
      total: Object.keys(stackDoc).length,
      stack: rank.docs[0].id,
    };
  } else {
    const docRef = doc(db, 'rank', stack);
    const rank = (await getDoc(docRef)).data();

    if (!rank) return { ranking: [], total: 0 };
    const ranking = Object.entries(rank)
      .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
      .slice(startIdx, endIdx);

    return { ranking, total: Object.keys(rank).length };
  }
}

/** 24/06/08 - get rank data query hooks */
export default function useRank(page = 1, stack: string | undefined) {
  const { data, isLoading, isSuccess, refetch } = useQuery(['rank'], () => getRank(page, stack));

  return { data, isLoading, isSuccess, refetch };
}
