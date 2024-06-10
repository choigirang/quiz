import React, { useState } from 'react';
import { useAppDispatch } from 'hooks/redux/useRedux';

import { logout } from 'store/modules/loginSlice';

import { UserIcon } from '@heroicons/react/24/outline';

/** 24/06/10 - login user */
export default function User({ id }: { id: string }) {
  const [isHover, setIsHover] = useState(false);

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    alert('로그아웃 되었습니다.');
    dispatch(logout());
  };

  return (
    <div
      className='flex justify-between items-center bg-defaultYellow px-1 py-1 text-defaultGreen rounded cursor-pointer'
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {isHover ? (
        <span className='w-full text-center font-bold' onClick={handleLogout}>
          로그아웃
        </span>
      ) : (
        <React.Fragment>
          <UserIcon width={16} height={16} color='white' fill='white' />
          <span>{id}</span>
        </React.Fragment>
      )}
    </div>
  );
}
