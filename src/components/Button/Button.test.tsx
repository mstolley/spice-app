import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';

describe('Button Component', () => {
    it('renders the button with default props', () => {
        render(<Button text="Click Me" />);
        const buttonElement = screen.getByTestId('button');

        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveTextContent('Click Me');
        expect(buttonElement).toHaveAttribute('type', 'submit');
        expect(buttonElement).not.toBeDisabled();
    });

    it('renders the button with custom props', () => {
        render(
            <Button
                text="Custom Button"
                type="button"
                disabled={true}
                id="custom-button"
                testId="custom-test-id"
                ariaLabel="Custom Button"
            />
        );
        const buttonElement = screen.getByTestId('custom-test-id');

        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveTextContent('Custom Button');
        expect(buttonElement).toHaveAttribute('type', 'button');
        expect(buttonElement).toBeDisabled();
        expect(buttonElement).toHaveAttribute('id', 'custom-button');
        expect(buttonElement).toHaveAttribute('aria-label', 'Custom Button');
    });

    it('calls the onClick handler when clicked', () => {
        const handleClick = vi.fn();
        render(<Button text="Click Me" onClick={handleClick} />);
        const buttonElement = screen.getByTestId('button');

        fireEvent.click(buttonElement);

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('applies the correct styles to the button', () => {
        render(<Button text="Styled Button" />);
        const buttonElement = screen.getByTestId('button');

        expect(buttonElement).toHaveClass(
            'rounded-md bg-blue-500 px-4 py-2 text-white transition-colors delay-100 duration-300 ease-in-out hover:bg-blue-600',
        );
    });
});
