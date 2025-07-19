import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Search } from '../components/search/search';
import userEvent from '@testing-library/user-event';

vi.mock('../api/apiClient', () => ({
  searchRequest: vi.fn().mockResolvedValue({
    animals: [],
    page: {
      pageNumber: 1,
      pageSize: 10,
      numberOfElements: 0,
      totalElements: 0,
      totalPages: 0,
    },
    sort: { clauses: [] },
  }),
}));

describe('Triggers search callback with correct parameters', () => {
  const mockProps = {
    setLoading: vi.fn(),
    setCardState: vi.fn(),
    setError: vi.fn(),
    onSearch: vi.fn(),
  };

  it('Triggers search callback with correct parameters', async () => {
    render(<Search {...mockProps} />);

    const user = userEvent.setup();
    const input = screen.getByPlaceholderText(/find your pet/i);
    const searchButton = screen.getByRole('button', { name: /tap to search/i });

    await user.type(input, ' cat ');
    await user.click(searchButton);

    await waitFor(() => {
      expect(mockProps.onSearch).toHaveBeenCalledWith('cat');
    });
  });
});
