import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

import { Search } from '../components/search/search';
import * as apiClient from '../api/apiClient';

describe('Shows empty input when no saved term exists', () => {
  const mockProps = {
    setLoading: vi.fn(),
    setCardState: vi.fn(),
    setError: vi.fn(),
    onSearch: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('renders empty input when localStorage has no searchTerm', async () => {
    vi.spyOn(apiClient, 'searchRequest').mockResolvedValueOnce({
      animals: [],
      page: {
        pageNumber: 0,
        pageSize: 0,
        numberOfElements: 0,
        totalElements: 0,
        totalPages: 0,
      },
      sort: {
        clauses: [],
      },
    });

    render(<Search {...mockProps} />);

    const input = await screen.findByPlaceholderText(/find your pet/i);

    expect(input).toHaveValue('');
    expect(mockProps.setLoading).toHaveBeenCalledTimes(2);

    await waitFor(() => {
      expect(mockProps.setCardState).toHaveBeenCalledWith([]);
    });
  });
});
