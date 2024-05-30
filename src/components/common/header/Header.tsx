import { Link } from 'react-router-dom';
import Category from './Category';

/** 2024/05/30 - header */
export default function Header() {
  return (
    <header className="w-[150px] h-screen p-5 border-r">
      {/* logo */}
      <h1 className="font-black">
        <Link to={'/'}>
          DEV<br></br>Quiz
        </Link>
      </h1>
      {/* category */}
      <Category />
    </header>
  );
}
