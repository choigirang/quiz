import React, { SetStateAction, useState } from 'react';

import { SelectQuizCategory } from '../../type/quiz';

import { stackCategory } from '../../assets/quiz';

type EnterProps = {
  children: JSX.Element | null;
  category: string | null;
  setCategory: (e: string) => void;
};

/** 24/06/02 - select stack category */
export default function Enter({ children, category, setCategory }: EnterProps) {
  return (
    <section className='relative'>
      <div className='flex flex-col justify-center items-center mb-5'>
        {children}
        {category ? (
          <h2>{`${stackCategory[category].name}를 선택하셨습니다.`}</h2>
        ) : (
          <h2>카테고리를 선택해주세요.</h2>
        )}
      </div>
      {/* list */}
      <ul className={`${!category ? 'grid grid-cols-5 gap-3' : 'none-style'}`}>
        {Object.keys(stackCategory).map((each) => {
          const key = each as SelectQuizCategory;
          const isSelected = category === key;

          return (
            <li
              key={key}
              className='border-2 py-5 px-3 text-center rounded font-black cursor-pointer shadow-md transition-all hover:scale-110 duration-300 ease-in-out'
              //   select category change style
              style={{
                display: !category ? 'block' : isSelected ? 'block' : 'none',
                color: stackCategory[key].color,
                backgroundColor: 'white',
                opacity: !category ? 100 : isSelected ? 100 : 0,
              }}
              onClick={() => setCategory(key)}
            >
              {stackCategory[key].name}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
