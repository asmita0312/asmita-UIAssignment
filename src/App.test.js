import { render, screen } from '@testing-library/react';
import App from './App';

test('renders reward points', () => {
  render(<App />);
  expect(screen.getByText('Retail Rewards Program')).toBeInTheDocument();
});
