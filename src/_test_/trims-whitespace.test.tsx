import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Search } from '../components/search/search';
import userEvent from '@testing-library/user-event';

describe('Trims whitespace from search input before saving', () => {
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
  it('Trims whitespace from search input before saving', async () => {
    render(<Search {...mockProps} />);
    const input = screen.getByPlaceholderText(/find your pet/i);
    const searchButton = screen.getByRole('button', { name: /tap to search/i });

    await userEvent.type(input, '   dog   ');
    await userEvent.click(searchButton);
    const saved = localStorage.getItem('searchTerm');
    expect(saved).toBe('dog');
  });
});
