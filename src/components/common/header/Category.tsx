import { AcademicCapIcon, BellSnoozeIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';

const CATEGORY = {
  퀴즈: { link: '/', icon: <BellSnoozeIcon width={16} height={16} /> },
  종합: { link: '/all', icon: <AcademicCapIcon width={16} height={16} /> },
  기록: { link: '/chart', icon: <ChartBarIcon width={16} height={16} /> },
};

/** 2024/05/30 - category */
export default function Category() {
  const path = useLocation().pathname;

  return (
    <ul className="flex flex-col mt-10 gap-10 text-sm">
      {/* category mapping */}
      {Object.entries(CATEGORY).map(([key, value]) => (
        <li key={key}>
          <Link to={value.link} className="flex items-center gap-3">
            {/* icon */}
            <span
              className={`p-1 ${path === value.link ? 'bg-yellow-400' : 'bg-white'} rounded border`}
            >
              {value.icon}
            </span>
            {/* link */}
            <span className={path === value.link ? 'font-black' : 'text-gray-500'}>{key}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
