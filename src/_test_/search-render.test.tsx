import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Search } from '../components/search/search';

describe('Renders search input and search button', () => {
  const mockProps = {
    setLoading: vi.fn(),
    setCardState: vi.fn(),
    setError: vi.fn(),
    onSearch: vi.fn(),
  };

  it('renders search input and search button', () => {
    render(<Search {...mockProps} />);

    const input = screen.getByPlaceholderText(/find your pet/i);
    const searchButton = screen.getByRole('button', { name: /tap to search/i });

    expect(input).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });
});
