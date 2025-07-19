import { describe, expect, it, vi } from 'vitest';
import { Search } from '../components/search/search';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

describe('Updates input value when user types', () => {
  const mockProps = {
    setLoading: vi.fn(),
    setCardState: vi.fn(),
    setError: vi.fn(),
    onSearch: vi.fn(),
  };
  it('Updates input value when user types', async () => {
    render(<Search {...mockProps} />);

    const input = screen.getByPlaceholderText(/find your pet/i);
    await userEvent.clear(input);
    await userEvent.type(input, 'cat');
    expect(input).toHaveValue('cat');
  });
});
