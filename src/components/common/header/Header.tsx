import { Link } from 'react-router-dom';
import Category from './Category';
import { useAppSelector } from '../../../hooks/redux/useRedux';

import { UserIcon } from '@heroicons/react/24/outline';

/** 2024/05/30 - header */
export default function Header() {
  const user = useAppSelector((state) => state.loginSlice);

  return (
    <header className='relative w-[150px] h-screen p-5 border-r'>
      {/* logo */}
      <h1 className='font-black'>
        <Link to={'/quiz'}>
          DEV<br></br>Quiz
        </Link>
      </h1>
      {/* category */}
      <Category />
      {/* user login */}
      {user.id && (
        <div className='absolute left-1/2 bottom-5 -translate-x-1/2 flex items-center gap-2'>
          <UserIcon width={16} height={16} />
          <span>{user.id}</span>
        </div>
      )}
    </header>
  );
}
