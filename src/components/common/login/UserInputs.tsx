import { SetStateAction, useState } from 'react';
import useInputs from '../../../hooks/useInputs';

import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

type UserProps = {
  submit: (id: string, code: string) => void;
  user: { id: string; code: string; exist: boolean };
  setUser: React.Dispatch<
    SetStateAction<{ id: string; code: string; exist: boolean }>
  >;
};

/** 2024/05/30 - user inputs for login */
export default function UserInputs({ submit, user, setUser }: UserProps) {
  // user name & code
  const { value: id, onChange: idChange } = useInputs();
  const { value: code, onChange: codeChange } = useInputs();

  const existUserHandler = (key: string) => {
    if (key === '신규 유저') setUser((prev) => ({ ...prev, exist: false }));
    else setUser((prev) => ({ ...prev, exist: true }));
  };

  return (
    <main className='flex flex-col gap-10 justify-center items-center w-full h-full'>
      <ExclamationTriangleIcon
        width={30}
        height={30}
        className='text-yellow-400'
      />
      {/* user check - exist or new */}
      <div className='flex gap-5'>
        {['신규 유저', '기존 유저'].map((key) => (
          <div className='flex gap-1' key={key}>
            <input
              type='radio'
              name='login'
              defaultChecked={key === '신규 유저'}
              onClick={() => existUserHandler(key)}
            />
            <span>{key}</span>
          </div>
        ))}
      </div>
      {/* user info - code or name by exist user */}
      <div className='flex flex-col gap-1'>
        <input
          value={id}
          onChange={idChange}
          placeholder={'닉네임을 입력해주세요.'}
          className='min-w-[200px] border border-yellow-400 rounded px-2 py-1'
        />
        {/* checkUser & code */}
        {user.exist && (
          <input
            value={code}
            onChange={codeChange}
            placeholder='부여받은 코드를 입력해주세요.'
            className='min-w-[200px] border border-yellow-400 rounded px-2 py-1'
          />
        )}
      </div>
      {/* submit btn - on/off by input value */}
      <button
        type='submit'
        onClick={() => submit(id, code)}
        className={`min-w-[150px] text-white font-bold py-1 rounded ${!id ? 'bg-slate-400' : 'bg-yellow-500 hover:bg-yellow-400'} transition duration-300 ease-in-out`}
        disabled={id === ''}
      >
        입장하기
      </button>
    </main>
  );
}
