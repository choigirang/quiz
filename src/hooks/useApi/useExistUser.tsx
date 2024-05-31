import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../utils/api/firebase';
import { useQuery } from 'react-query';

export default function useExistUser(id: string, code: string) {
  // check exist user
  async function getExistUser(id: string, code: string) {
    const docRef = doc(db, 'users', id);
    const docSnap = await getDoc(docRef);
    const user = docSnap.exists();
    const userData = docSnap.data();

    if (user && userData) {
      if (userData.code === code) return alert('로그인 되었습니다.');
      else return alert('일치하지 않는 사용자입니다.');
    } else {
      throw new Error('No such document!');
    }
  }

  const queryResult = useQuery(['user', id], () => getExistUser(id, code), {
    enabled: !!id, // id가 있을 때만 쿼리를 실행
  });

  return queryResult;
}
