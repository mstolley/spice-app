import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';

describe('Header Component', () => {
    it('renders the default text when no props are provided', () => {
        render(<Header text="Spice App" />);
        const headerElement = screen.getByTestId('header');

        expect(headerElement).toBeInTheDocument();
        expect(headerElement).toHaveTextContent('Spice App');
    });

    it('renders the provided text when the "text" prop is passed', () => {
        render(<Header text="Custom Header Text" />);
        const headerElement = screen.getByTestId('header');

        expect(headerElement).toBeInTheDocument();
        expect(headerElement).toHaveTextContent('Custom Header Text');
    });

    it('applies the correct styles to the header', () => {
        render(<Header text="Default Header Text" />);
        const headerElement = screen.getByTestId('header');

        expect(headerElement).toHaveClass(
            'mb-5 h-14 w-full rounded-lg bg-gray-600 p-2.5 text-center text-xl text-gray-100 shadow-sm shadow-gray-600 lg:text-3xl'
        );
    });
});
