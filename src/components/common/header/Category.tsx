import {
  AcademicCapIcon,
  BellSnoozeIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/redux/useRedux';

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

  const createLink = (link: string) => {
    if (link === '/quiz') {
      if (stack) return `/quiz/${stack}`;
      else return '/quiz';
    }

    if (link === '/all') {
      if (sheet) return `/all/${sheet}`;
      else return '/all';
    } else return link;
  };

  return (
    <ul className='flex flex-col mt-10 gap-10 text-sm'>
      {/* category mapping */}
      {Object.entries(CATEGORY).map(([key, value]) => {
        // if login & selected stack && home page = seleted stack page
        return (
          <li key={key}>
            <Link
              to={createLink(value.link)}
              className='flex items-center gap-3'
            >
              {/* icon */}
              <span
                className={`p-1 ${path.startsWith(value.link) ? 'bg-yellow-400' : 'bg-white'} rounded border`}
              >
                {value.icon}
              </span>
              {/* link */}
              <span
                className={
                  path.includes(value.link) ? 'font-black' : 'text-gray-500'
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
