import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Search } from '../components/search/search';

describe('Overwrites existing localStorage value when new search is performed', () => {
  const mockProps = {
    setLoading: vi.fn(),
    setCardState: vi.fn(),
    setError: vi.fn(),
    onSearch: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.setItem('searchTerm', 'old term');
  });
  afterEach(() => {
    localStorage.clear();
  });
  it('Overwrites existing localStorage value when new search is performed', async () => {
    render(<Search {...mockProps} />);

    const user = userEvent.setup();
    const input = screen.getByPlaceholderText(/find your pet/i);
    const searchButton = screen.getByRole('button', { name: /tap to search/i });

    await user.clear(input);
    await user.type(input, 'new term');
    await user.click(searchButton);

    expect(localStorage.getItem('searchTerm')).toBe('new term');
  });
});
