import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as apiClient from '../api/apiClient';

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

describe('Search Component Tests', () => {
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

  afterEach(() => {
    localStorage.clear();
  });

  // check correct renders search button and search input
  it('Renders search input and search button', () => {
    render(<Search {...mockProps} />);

    const input = screen.getByPlaceholderText(/find your pet/i);
    const searchButton = screen.getByRole('button', { name: /tap to search/i });

    expect(input).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  // Check previously saved search term from LS
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

  //check if input is empty when no saved term exists
  it('Shows empty input when no saved term exists', async () => {
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

  // Verifies that the input field updates its value when the user types
  it('Updates input value when user types', async () => {
    render(<Search {...mockProps} />);

    const input = screen.getByPlaceholderText(/find your pet/i);
    await userEvent.clear(input);
    await userEvent.type(input, 'cat');
    expect(input).toHaveValue('cat');
  });

  // Check if search button save search term to LS
  it('Saves search term to localStorage when search button is clicked', async () => {
    render(<Search {...mockProps} />);

    const input = screen.getByPlaceholderText(/find your pet/i);
    const searchButton = screen.getByRole('button', { name: /tap to search/i });
    await userEvent.type(input, 'phoenix');
    await userEvent.click(searchButton);
    const savedTerm = localStorage.getItem('searchTerm');
    expect(savedTerm).toBe('phoenix');
  });

  // Check if whitespace before input was trimmed
  it('Trims whitespace from search input before saving', async () => {
    render(<Search {...mockProps} />);
    const input = screen.getByPlaceholderText(/find your pet/i);
    const searchButton = screen.getByRole('button', { name: /tap to search/i });

    await userEvent.type(input, '   dog   ');
    await userEvent.click(searchButton);
    const saved = localStorage.getItem('searchTerm');
    expect(saved).toBe('dog');
  });

  // Checks that onSearch is called with trimmed input
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

  //
});
