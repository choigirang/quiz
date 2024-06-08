import React, { SetStateAction, useState } from 'react';
import { CategoryData, SelectQuizCategory } from '../../../type/quiz';
import { CategroyState } from './QuizPage';
import { useAppSelector } from '../../../hooks/redux/useRedux';
import { stackCategory } from '../../../assets/quiz';

type EnterProps = {
  setCategory: React.Dispatch<SetStateAction<CategroyState>>;
};

/** 24/06/02 - select stack category */
export default function Enter({ setCategory }: EnterProps) {
  const [selected, setSelected] = useState<SelectQuizCategory | null>();

  //   select category stack
  const handleClick = (key: SelectQuizCategory) => {
    setSelected(key);
    setCategory((prev) => ({ ...prev, stack: key }));
  };

  return (
    <section className='relative'>
      <div className='flex flex-col justify-center items-center mb-5'>
        <h2 className='text-xl font-black'>환영합니다.</h2>
        <h2>카테고리를 선택해주세요.</h2>
      </div>
      {/* list */}
      <ul className={`${!selected ? 'grid grid-cols-5 gap-3' : 'none-style'}`}>
        {Object.keys(stackCategory).map((each) => {
          const key = each as SelectQuizCategory;
          const isSelected = selected === key;

          return (
            <li
              key={key}
              className='border-2 py-5 px-3 text-center rounded font-black cursor-pointer shadow-md transition-all duration-300 ease-in-out'
              //   select category change style
              style={{
                display: !selected ? 'block' : isSelected ? 'block' : 'none',
                borderColor: stackCategory[key].color,
                color: stackCategory[key].color,
                backgroundColor: 'white',
                opacity: !selected ? 100 : isSelected ? 100 : 0,
                transform: !selected
                  ? 'scale(1)'
                  : isSelected
                    ? 'scale(1.5)'
                    : 'scale(0)',
              }}
              onClick={() => handleClick(key)}
            >
              {stackCategory[key].name}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
