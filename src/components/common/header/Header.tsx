import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/redux/useRedux';

import Category from './Category';

import User from './User';

/** 2024/05/30 - header */
export default function Header() {
  const user = useAppSelector((state) => state.loginSlice);

  return (
    <header className='flex flex-col justify-between w-[150px] h-screen p-5 border-r'>
      <div>
        {/* logo */}
        <h1>
          <Link to={'/quiz'} className='font-bold'>
            DEV<br></br>Quiz
          </Link>
        </h1>
        {/* category */}
        <Category />
      </div>
      {/* user login */}
      {user.id && <User id={user.id} />}
    </header>
  );
}
