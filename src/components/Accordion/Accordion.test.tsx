import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Accordion from './Accordion';
import { Spice } from '../../types';

describe('Accordion Component', () => {
  const mockSpices: Spice[] = [
    { id: 1, name: 'Cinnamon', color: 'brown', heat: 2, price: '5' },
    { id: 2, name: 'Nutmeg', color: 'beige', heat: 1, price: '3' },
  ];

  it('renders the Accordion title correctly', () => {
    render(<Accordion text="Spice List" list={mockSpices} />);

    const title = screen.getByText('Spice List');
    expect(title).toBeInTheDocument();
  });
});
