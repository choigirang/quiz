import { useMutation, useQuery } from 'react-query';
import { api } from '../../utils/api/api';
import { getDocs, doc, collection, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../utils/api/firebase';

/** 24/05/30 - 유저 로그인 데이터 hooks */
export default async function useSignUser(id: string) {
  // check user lenght
  async function getUserCount() {
    const querySnapshot = await getDocs(collection(db, 'users'));
    return querySnapshot.size;
  }

  // sign user
  async function signNewUser(id: string) {
    const userCount = await getUserCount();
    const userRef = doc(db, 'users', id);
    const userData = { id, code: userCount + 1 };
    await setDoc(userRef, userData);
  }

  const mutation = useMutation(['user', id], () => signNewUser(id));

  return mutation;
}
