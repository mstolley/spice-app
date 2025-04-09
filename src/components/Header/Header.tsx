interface HeaderProps {
  text: string;
}

function Header({ text = 'Spice App' }: HeaderProps) {
  return (
    <header
      data-testid="header"
      className={`
        mb-5 h-14 w-full rounded-lg bg-gray-600 p-2.5 text-center text-xl
        text-gray-100 shadow-sm shadow-gray-600
        lg:text-3xl
      `}
    >
      {text}
    </header>
  );
}

export default Header;
