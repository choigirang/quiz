import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../utils/api/firebase';
import { useQuery } from 'react-query';
import { useAppDispatch } from '../redux/useRedux';
import { login } from '../../store/modules/loginSlice';
import { LoginData } from '../../type/login';

// check exist user
async function getExistUser(id: string, code: string) {
  if (!id || !code) {
    return Promise.reject(new Error('ID와 코드가 필요합니다.'));
  }

  const docRef = doc(db, 'users', id);
  const docSnap = await getDoc(docRef);
  const user = docSnap.exists();
  const userData = docSnap.data();

  if (user && userData) {
    if (userData.code === code) {
      alert('로그인 되었습니다.');
      return userData;
    } else {
      alert('일치하지 않는 사용자입니다.');
      return Promise.reject(new Error('일치하지 않는 사용자입니다.'));
    }
  } else {
    throw new Error('사용자를 찾을 수 없습니다.');
  }
}

/** 24/06/01 - get exist user data query hooks */
export default function useExistUser(id: string, code: string) {
  const dispatch = useAppDispatch();

  const { data, isLoading, isSuccess, refetch } = useQuery(
    ['user', id],
    () =>
      getExistUser(id, code)
        .then((res) => {
          dispatch(login(res as LoginData));
        })
        .catch((err) => alert(err)),
    { enabled: false }
  );

  return { data, isLoading, isSuccess, refetch };
}
