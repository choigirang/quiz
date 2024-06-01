import React, { SetStateAction } from 'react';
import { CategoryData, SelectQuizCategory } from '../../type/quiz';

type EnterProps = {
  setCategory: React.Dispatch<SetStateAction<SelectQuizCategory | undefined>>;
};

const category: CategoryData = {
  html: { name: 'Html', color: '#DC4A25' },
  css: { name: 'Css', color: '#244BDD' },
  js: { name: 'Javascript', color: '#EFD81A' },
  ts: { name: 'Typescript', color: '#2F73BF' },
  react: { name: 'React', color: '#5ED2F3' },
  next: { name: 'Next', color: 'black' },
};

export default function Enter({ setCategory }: EnterProps) {
  return (
    <React.Fragment>
      <p className='flex flex-col justify-center items-center'>
        <span>환영합니다.</span>
        <span>카테고리를 선택해주세요.</span>
      </p>
      <ul className='flex flex-col'>
        {Object.keys(category).map((each) => (
          <li
            key={each}
            className='px-10 py-5 text-center text-white rounded font-black cursor-pointer'
            style={{ backgroundColor: category[each].color }}
            onClick={() => setCategory(each)}
          >
            {category[each].name}
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
}
