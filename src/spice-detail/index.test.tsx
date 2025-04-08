import { render, screen } from '@testing-library/react';
import SpiceDetail from './index';

vi.mock('react-router-dom', async () => {
  const originalRouter = await vi.importActual('react-router-dom');
  return {
    ...originalRouter,
    useParams: () => {
      return {
        id: '0',
      };
    },
  };
});

test('renders spice detail page', async () => {
  render(<SpiceDetail />);

  expect(screen.getByRole('heading', { name: /spice/i })).toBeInTheDocument();
  expect(await screen.findByText(/adobo/i)).toBeInTheDocument();
});
