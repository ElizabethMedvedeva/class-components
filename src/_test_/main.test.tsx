import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as apiClient from '../api/apiClient';

import { Main } from '../pages/main/main.tsx';
import userEvent from '@testing-library/user-event';

vi.mock('../api/apiClient', () => ({
  searchRequest: vi.fn().mockResolvedValue({
    animals: [],
    page: {
      pageNumber: 0,
      pageSize: 10,
      numberOfElements: 0,
      totalElements: 0,
      totalPages: 0,
    },
    sort: { clauses: [] },
  }),
}));

describe('Search Component Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  // check correct renders search button and search input
  it('Renders search input and search button', () => {
    render(<Main />);

    const input = screen.getByPlaceholderText(/Find your pet/i);
    const searchButton = screen.getByRole('button', { name: /tap to search/i });

    expect(input).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  // Displays previously saved search term from localStorage on mount
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

    render(<Main />);
    const input = await screen.findByPlaceholderText(/Find your pet/i);
    expect(input).toHaveValue('dog');
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

    render(<Main />);

    const input = await screen.findByPlaceholderText(/Find your pet/i);

    expect(input).toHaveValue('');
  });

  // Verifies that the input field updates its value when the user types
  it('Updates input value when user types', async () => {
    render(<Main />);

    const input = screen.getByPlaceholderText(/Find your pet/i);
    await userEvent.clear(input);
    await userEvent.type(input, 'cat');
    expect(input).toHaveValue('cat');
  });

  it('Displays error message when API call fails', async () => {
    const mockedSearchRequest = vi.mocked(apiClient.searchRequest);
    mockedSearchRequest.mockRejectedValue(new Error('Network Error'));
    render(<Main />);

    const user = userEvent.setup();
    const input = screen.getByPlaceholderText(/find your pet/i);
    const button = screen.getByRole('button', { name: /tap to search/i });

    await user.type(input, 'dog');
    await user.click(button);
    const errorText = screen.getByText(/Failed to load animals./i);
    expect(errorText).toHaveTextContent('Failed to load animals.');
  });

  // Check if search button save search term to LS
  it('Saves search term to localStorage when search button is clicked', async () => {
    render(<Main />);

    const input = screen.getByPlaceholderText(/Find your pet/i);
    const searchButton = screen.getByRole('button', { name: /tap to search/i });
    await userEvent.type(input, 'phoenix');
    await userEvent.click(searchButton);
    const savedTerm = localStorage.getItem('searchTerm');
    expect(savedTerm).toBe('phoenix');
  });

  // Check if whitespace before input was trimmed
  it('Trims whitespace from search input before saving', async () => {
    render(<Main />);
    const input = screen.getByPlaceholderText(/Find your pet/i);
    const searchButton = screen.getByRole('button', { name: /tap to search/i });

    await userEvent.type(input, '   dog   ');
    await userEvent.click(searchButton);
    const saved = localStorage.getItem('searchTerm');
    expect(saved).toBe('dog');
  });

  // Checks that onSearch is called with trimmed input
  it('Triggers search callback with correct parameters', async () => {
    const mockedSearchRequest = vi.mocked(apiClient.searchRequest);
    render(<Main />);

    const user = userEvent.setup();
    const input = screen.getByPlaceholderText(/Find your pet/i);
    const searchButton = screen.getByRole('button', { name: /tap to search/i });

    await user.type(input, ' cat ');
    await user.click(searchButton);

    expect(mockedSearchRequest).toHaveBeenCalledWith(
      'cat',
      0,
      expect.anything()
    );
  });

  // Overwrites existing localStorage value with new search
  it('Overwrites existing localStorage value when new search is performed', async () => {
    localStorage.setItem('searchTerm', 'old term');

    render(<Main />);

    const user = userEvent.setup();
    const input = screen.getByPlaceholderText(/Find your pet/i);
    const searchButton = screen.getByRole('button', { name: /tap to search/i });

    await user.clear(input);
    await user.type(input, 'new term');
    await user.click(searchButton);

    expect(localStorage.getItem('searchTerm')).toBe('new term');
  });
});
