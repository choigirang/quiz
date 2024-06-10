import { useQuery } from 'react-query';

import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../utils/api/firebase';

async function getUserRank(id: string, stack: string | undefined) {
  // !stack
  if (!stack) return undefined;

  const docRef = doc(db, 'rank', stack);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return undefined;
  }
  const userData = docSnap.data();
  const score = userData[id];

  // !user data
  if (score === undefined) {
    return undefined;
  }

  // rank
  const sortedRanks = Object.entries(userData).sort(
    ([, scoreA], [, scoreB]) => (scoreB as number) - (scoreA as number)
  );

  const rank = sortedRanks.findIndex(([userId]) => userId === id) + 1;

  return { score, rank };
}

export default function useRankWithUser(id: string, stack: string | undefined) {
  const { data, isLoading, isSuccess, refetch } = useQuery(
    ['rank', id],
    () => getUserRank(id, stack),
    { enabled: false }
  );

  return { data, refetch };
}
