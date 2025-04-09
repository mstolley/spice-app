import { useLocation, Link } from 'react-router-dom';
interface HeaderProps {
  text: string;
}

function Header({ text = 'Spice App' }: HeaderProps) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      <header
        data-testid='header'
        className={`
          mb-2.5 h-14 w-full rounded-lg bg-gray-600 p-2.5 text-center text-xl
          text-gray-100 shadow-sm shadow-gray-600
          lg:text-3xl
        `}
      >
        {text}
      </header>
      {!isHome && (
        <div
          className={`mb-5 h-7 w-full`}
        >
          <Link className={`
            rounded-md bg-gray-200 px-4 py-2 text-xs text-blue-500
            transition-colors delay-100 duration-300 ease-in-out
            hover:text-blue-600
          `} to="/">Home</Link>
        </div>
      )}
    </>
  );

}

export default Header;
