import { useQuery } from 'react-query';

import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../utils/api/firebase';

async function getGraph(stack: string) {
  const docRef = doc(db, 'rank', stack);
  const stackRef = (await getDoc(docRef)).data();

  return stackRef;
}

/** 24/06/09 - get all user data by stack */
export default function useGraph(stack: string) {
  const { data, isLoading, refetch } = useQuery(['graph'], () => getGraph(stack), {
    enabled: false,
  });

  return { data, isLoading, refetch };
}
