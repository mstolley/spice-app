interface ButtonProps {
  text: string;
  type?: 'submit' | 'button' | 'reset';
  disabled?: boolean;
  id?: string;
  testId?: string;
  ariaLabel?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function Button({ text, type = 'submit', testId = 'button', disabled = false, id, ariaLabel, onClick }: ButtonProps) {
  return (
    <button
      aria-label={ariaLabel}
      type={type}
      data-testid={testId}
      className={`
        rounded-md bg-blue-500 px-4 py-2 text-white transition-colors delay-100
        duration-300 ease-in-out
        hover:bg-blue-600
      `}
      disabled={disabled}
      id={id}
      onClick={onClick}
    >{text}</button>
  );
};

export default Button;
