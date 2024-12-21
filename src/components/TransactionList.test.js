import { render, screen, waitFor } from '@testing-library/react';
import TransactionList from './TransactionList';

test('displays transactions correctly', async () => {
  render(<TransactionList />);
  await waitFor(() => {
    expect(screen.getByText('Customer 1')).toBeInTheDocument();
  }, { timeout: 3000 });
  expect(screen.getByText('2024-10: 120 points')).toBeInTheDocument();
});
