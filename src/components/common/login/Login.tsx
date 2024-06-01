import { useEffect, useState } from 'react';
import UserInputs from './UserInputs';
import useExistUser from '../../../hooks/useApi/useExistUser';
import useSignUser from '../../../hooks/useApi/useSignUser';

import SelectUser from './SelectUser';

/** 24/05/30 - Login pop */
export default function Login() {
  // (exist user && code set) || (new user && none code)
  const [exist, setExist] = useState(false);
  const [user, setUser] = useState({ id: '', code: '' });

  // exist user data
  const { refetch } = useExistUser(user.id, user.code);
  // new user data
  const { mutation } = useSignUser(user.id);

  // get user data query
  useEffect(() => {
    if (exist && user.id && user.code) {
      refetch();
    }
  }, [user.code]);

  // create new user query
  useEffect(() => {
    if (!exist && user.id) {
      mutation.mutate();
    }
  }, [user.id]);

  return (
    <main className='flex flex-col gap-10 justify-center items-center w-full h-full'>
      {/* func: change exist state */}
      <SelectUser setExist={setExist} />
      {/* func: sign or login */}
      <UserInputs exist={exist} setUser={setUser} />
    </main>
  );
}
