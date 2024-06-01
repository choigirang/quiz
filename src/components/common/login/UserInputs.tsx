import React, { SetStateAction } from 'react';
import useInputs from '../../../hooks/useInputs';

type UserProps = {
  exist: boolean;
  setUser: React.Dispatch<SetStateAction<{ id: string; code: string }>>;
};

/** 2024/05/30 - user inputs for login */
export default function UserInputs({ exist, setUser }: UserProps) {
  // user name & code
  const { value: id, onChange: idChange } = useInputs();
  const { value: code, onChange: codeChange } = useInputs();

  // submit user data
  const submitUser = () => {
    if (exist) return setUser({ id, code });
    else return setUser((prev) => ({ ...prev, id }));
  };

  return (
    <React.Fragment>
      {/* user info - code or name by exist user */}
      <div className='flex flex-col gap-1'>
        <input
          value={id}
          name='user name'
          onChange={idChange}
          placeholder={'닉네임을 입력해주세요.'}
          className='min-w-[200px] border border-yellow-400 rounded px-2 py-1'
        />
        {/* checkUser & code */}
        {exist && (
          <input
            value={code}
            name='user code'
            onChange={codeChange}
            placeholder='부여받은 코드를 입력해주세요.'
            className='min-w-[200px] border border-yellow-400 rounded px-2 py-1'
          />
        )}
      </div>
      {/* submit btn - on/off by input value */}
      <button
        type='submit'
        onClick={submitUser}
        className={`min-w-[150px] text-white font-bold py-1 rounded ${!id ? 'bg-slate-400' : 'bg-yellow-500 hover:bg-yellow-400'} transition duration-300 ease-in-out`}
        disabled={id === ''}
      >
        입장하기
      </button>
    </React.Fragment>
  );
}
