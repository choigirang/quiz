import { useState } from 'react';
import useInputs from '../../../hooks/useInputs';

import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

type UserProps = {
  submit: (exist: boolean) => void;
};

/** 2024/05/30 - user inputs for login */
export default function UserInputs({ submit }: UserProps) {
  // false => 신규, true => 기존
  const [checkUser, setCheckUser] = useState(false);
  // user name or code
  const { value, onChange } = useInputs();

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
              onClick={() => setCheckUser((prev) => !prev)}
            />
            <span>{key}</span>
          </div>
        ))}
      </div>
      {/* user info - code or name by exist user */}
      <input
        value={value}
        onChange={onChange}
        placeholder={
          checkUser ? '부여받은 코드를 입력해주세요.' : '닉네임을 입력해주세요.'
        }
        className='min-w-[200px] border border-yellow-400 rounded px-2 py-1'
      />
      {/* submit btn - on/off by input value */}
      <button
        type='submit'
        onSubmit={() => submit(checkUser)}
        className={`min-w-[150px] text-white font-bold py-1 rounded ${!value ? 'bg-slate-400' : 'bg-yellow-500 hover:bg-yellow-400'} transition duration-300 ease-in-out`}
        disabled={value === ''}
      >
        입장하기
      </button>
    </main>
  );
}
