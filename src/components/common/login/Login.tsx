import React, { Suspense, useState } from 'react';
import User from './User';
import Loading from '../loading/Loading';
import UserInputs from './UserInputs';

/** 24/05/30 - Login pop */
export default function Login() {
  const [user, setUser] = useState({ user: '', exist: false });

  const onSubmit = (exist: boolean) => {
    if (exist) {
      // data fetching(exist user) & set user name
    } else {
      // data post(new user) & set user name
    }
  };

  return (
    <React.Fragment>
      {user.user ? (
        <Suspense fallback={<Loading />}>
          <User></User>
        </Suspense>
      ) : (
        <UserInputs submit={onSubmit} />
      )}
    </React.Fragment>
  );
}
