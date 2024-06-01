import React, { SetStateAction } from 'react';

import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

type ExistUser = {
  setExist: React.Dispatch<SetStateAction<boolean>>;
};

/** 24/06/01 - exist or new user select */
export default function SelectUser({ setExist }: ExistUser) {
  /** exist or new user handler*/
  const changeExist = (key: string) => {
    if (key === '신규 유저') return setExist(false);
    else return setExist(true);
  };

  return (
    <React.Fragment>
      <ExclamationTriangleIcon
        width={30}
        height={30}
        className='text-yellow-400'
      />
      {/* user check - exist or new */}
      <div className='flex gap-5'>
        {['신규 유저', '기존 유저'].map((key) => (
          <label className='flex gap-1' key={key}>
            <input
              type='radio'
              name='user'
              defaultChecked={key === '신규 유저'}
              onClick={() => changeExist(key)}
            />
            {key}
          </label>
        ))}
      </div>
    </React.Fragment>
  );
}
