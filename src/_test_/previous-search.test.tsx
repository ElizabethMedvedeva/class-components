import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

import { Search } from '../components/search/search';
import * as apiClient from '../api/apiClient';

describe('Displays previously saved search term from localStorage on mount', () => {
  const mockProps = {
    setLoading: vi.fn(),
    setCardState: vi.fn(),
    setError: vi.fn(),
    onSearch: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('Displays previously saved search term from localStorage on mount', async () => {
    localStorage.setItem('searchTerm', 'dog');

    vi.spyOn(apiClient, 'searchRequest').mockResolvedValueOnce({
      animals: [
        {
          name: 'dog',
          uid: '1',
          avian: false,
          canine: true,
          feline: false,
          earthAnimal: true,
          earthInsect: false,
        },
      ],
      page: {
        pageNumber: 1,
        pageSize: 10,
        numberOfElements: 1,
        totalElements: 1,
        totalPages: 1,
      },
      sort: {
        clauses: [],
      },
    });

    render(<Search {...mockProps} />);
    const input = await screen.findByPlaceholderText(/find your pet/i);
    expect(input).toHaveValue('dog');

    await waitFor(() => {
      expect(mockProps.setCardState).toHaveBeenCalled();
    });

    expect(mockProps.setLoading).toHaveBeenCalledTimes(2);
  });
});
