import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/redux/useRedux';
import useMobile from 'hooks/useMobile';

import Category from './Category';

import User from './User';

/** 2024/05/30 - header */
export default function Header() {
  const user = useAppSelector((state) => state.loginSlice);
  const { isMobile } = useMobile();

  return (
    <header
      className={`flex ${isMobile ? 'flex-row w-full' : 'flex-col w-[150px] h-screen'} justify-between p-5 border-r`}
    >
      <div className={`${isMobile ? 'flex items-center gap-10' : 'not-mobile'}`}>
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
