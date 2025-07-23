import { render, waitFor, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Search } from '../components/search/search';
import * as apiClient from '../api/apiClient';

vi.mock('../api/apiClient', () => ({
  searchRequest: vi.fn().mockResolvedValue({
    animals: [],
    page: {
      pageNumber: 1,
      pageSize: 10,
      numberOfElements: 0,
      totalElements: 0,
      totalPages: 1,
    },
    sort: {
      clauses: [],
    },
  }),
}));

describe('Retrieves saved search term on component mount', () => {
  const mockProps = {
    setLoading: vi.fn(),
    setCardState: vi.fn(),
    setError: vi.fn(),
    onSearch: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.setItem('searchTerm', 'gog');
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('Retrieves saved search term on component mount', async () => {
    render(<Search {...mockProps} />);

    const input = await screen.findByPlaceholderText(/find your pet/i);
    expect(input).toHaveValue('dog');

    await waitFor(() => {
      expect(apiClient.searchRequest).toHaveBeenCalledWith('gog');
    });

    expect(mockProps.setLoading).toHaveBeenCalledTimes(2);
    expect(mockProps.setCardState).toHaveBeenCalledWith([]);
  });
});
