import { useMutation, useQuery, useQueryClient } from 'react-query';
import { api } from '../../utils/api/api';
import { getDocs, doc, collection, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../utils/api/firebase';
import { useAppDispatch } from '../redux/useRedux';
import { login } from '../../store/modules/loginSlice';

// check user lenght
async function getUserCount() {
  const querySnapshot = await getDocs(collection(db, 'users'));
  return querySnapshot.size;
}

// sign user
async function signNewUser(id: string) {
  const userRef = doc(db, 'users', id);
  const userSnap = await getDoc(userRef);

  // user name check
  if (userSnap.exists()) {
    return Promise.reject(new Error('이미 존재하는 사용자명입니다. '));
  } else {
    const userCount = await getUserCount();
    const userData = { id, code: String(userCount + 1) };
    return await setDoc(userRef, userData);
  }
}

/** 24/06/01 - create new user query hooks */
export default function useSignUser(id: string) {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const mutation = useMutation(() => signNewUser(id), {
    onSuccess: async () => {
      const userCount = (await getUserCount()) + 1;
      queryClient.invalidateQueries(['user', id]);
      dispatch(login({ id, code: String(userCount) }));
      alert(
        `가입이 완료되었습니다.
      사용자명 : ${id} / 사용자 코드 : ${userCount}`
      );
    },
    onError: (err) => {
      alert(err);
    },
  });

  return { mutation };
}
