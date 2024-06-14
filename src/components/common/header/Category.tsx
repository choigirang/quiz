import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useMobile from 'hooks/useMobile';

import { useAppSelector } from '../../../hooks/redux/useRedux';

import { AcademicCapIcon, BellSnoozeIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const CATEGORY = {
  퀴즈: { link: '/quiz', icon: <BellSnoozeIcon width={16} height={16} /> },
  종합: { link: '/all', icon: <AcademicCapIcon width={16} height={16} /> },
  기록: { link: '/chart', icon: <ChartBarIcon width={16} height={16} /> },
};

/** 2024/05/30 - category */
export default function Category() {
  const { isMobile } = useMobile();
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

  return (
    <ul className={`flex ${isMobile ? 'flex-row gap-5' : 'flex-col mt-10 gap-10'} text-sm`}>
      {/* category mapping */}
      {categoryEntries.map(([key, value]) => {
        // if login & selected stack && home page = seleted stack page
        return (
          <li key={key}>
            <Link to={createLink(value.link)} className='flex items-center gap-3'>
              {/* icon */}
              {!isMobile && (
                <span
                  className={`p-1 ${path.startsWith(value.link) || (path === '/' && value.link.startsWith('/quiz')) ? 'bg-yellow-400' : 'bg-white'} rounded border`}
                >
                  {value.icon}
                </span>
              )}
              {/* link */}
              <span
                className={
                  path.startsWith(value.link) || (path === '/' && value.link.startsWith('/quiz'))
                    ? 'font-black'
                    : 'text-gray-500'
                }
              >
                {key}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
