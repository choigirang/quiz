import { useState } from 'react';

export default function useInputs() {
  const [value, setValue] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
  };

  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;
  };

  return { value, onChange };
}
