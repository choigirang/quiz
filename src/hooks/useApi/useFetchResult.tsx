import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useMutation, useQueryClient } from 'react-query';
import { db } from '../../utils/api/firebase';

async function transmitResult(stack: string, id: string, score: number) {
  const rankRef = doc(db, 'rank', stack);
  const addScore = {
    [id]: score,
  };
  return await setDoc(rankRef, addScore, { merge: true });
}

/** 24/06/05 - transmit user Quiz data */
export default function useFetchResult(
  stack: string,
  id: string,
  score: number
) {
  const queryClient = useQueryClient();

  const mutation = useMutation(() => transmitResult(stack, id, score), {
    onSuccess: () => {
      queryClient.invalidateQueries(['user', id]);
      alert('저장되었습니다.');
    },
    onError: (err) => {
      alert(err);
    },
  });

  return { mutation };
}
