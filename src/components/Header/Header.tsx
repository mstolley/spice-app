interface HeaderProps {
    text: string;
}

function Header({ text }: HeaderProps) {
    return (
        <header
            className='text-xl lg:text-3xl w-full h-14 text-center text-gray-100 bg-gray-600 rounded-lg shadow-sm shadow-gray-600 p-2.5 mb-5'
        >{text}</header>
    );

};

export default Header;