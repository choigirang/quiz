import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useAppSelector } from '../../../hooks/redux/useRedux';

import { AcademicCapIcon, BellSnoozeIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const CATEGORY = {
  퀴즈: { link: '/quiz', icon: <BellSnoozeIcon width={16} height={16} /> },
  종합: { link: '/all', icon: <AcademicCapIcon width={16} height={16} /> },
  기록: { link: '/chart', icon: <ChartBarIcon width={16} height={16} /> },
};

/** 2024/05/30 - category */
export default function Category() {
  const path = useLocation().pathname;
  const { stack } = useAppSelector((state) => state.selectStackSlice);
  const { stack: sheet } = useAppSelector((state) => state.sheetStackSlice);

  const categoryEntries = useMemo(() => Object.entries(CATEGORY), []);

  const createLink = useMemo(
    () => (link: string) => {
      if (link === '/quiz') {
        return stack ? `/quiz/${stack}` : '/quiz';
      }
      if (link === '/all') {
        return sheet ? `/all/${sheet}` : '/all';
      }
      return link;
    },
    [stack, sheet]
  );

  const makeStyle = useMemo(
    () => (link: string) => {
      if (link === path || (link.startsWith('/quiz') && path === '/')) return true;
    },
    []
  );

  return (
    <ul className='flex flex-col mt-10 gap-10 text-sm'>
      {/* category mapping */}
      {categoryEntries.map(([key, value]) => {
        // if login & selected stack && home page = seleted stack page
        return (
          <li key={key}>
            <Link to={createLink(value.link)} className='flex items-center gap-3'>
              {/* icon */}
              <span
                className={`p-1 ${makeStyle(value.link) ? 'bg-yellow-400' : 'bg-white'} rounded border`}
              >
                {value.icon}
              </span>
              {/* link */}
              <span className={makeStyle(value.link) ? 'font-black' : 'text-gray-500'}>{key}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
