import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Search } from '../components/search/search';
import userEvent from '@testing-library/user-event';

describe('Saves search term to localStorage when search button is clicked', () => {
  const mockProps = {
    setLoading: vi.fn(),
    setCardState: vi.fn(),
    setError: vi.fn(),
    onSearch: vi.fn(),
  };
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('Saves search term to localStorage when search button is clicked', async () => {
    render(<Search {...mockProps} />);

    const input = screen.getByPlaceholderText(/find your pet/i);
    const searchButton = screen.getByRole('button', { name: /tap to search/i });
    await userEvent.type(input, 'phenix');
    await userEvent.click(searchButton);
    const savedTerm = localStorage.getItem('searchTerm');
    expect(savedTerm).toBe('phenix');
  });
});
