import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as apiClient from '../api/apiClient';
import { render, screen } from '@testing-library/react';
import { Search } from '../components/search/search';
import userEvent from '@testing-library/user-event';

vi.mock('../api/apiClient');

describe('Displays error message when API call fails', () => {
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
  it('Displays error message when API call fails', async () => {
    const mockedSearchRequest = vi.mocked(apiClient.searchRequest);
    mockedSearchRequest.mockRejectedValueOnce(new Error('Network Error'));

    render(<Search {...mockProps} />);

    const user = userEvent.setup();
    const input = screen.getByPlaceholderText(/find your pet/i);
    const button = screen.getByRole('button', { name: /tap to search/i });

    await user.type(input, 'dog');
    await user.click(button);
    expect(mockProps.setError).toHaveBeenCalledWith(
      'Something went wrong while searching. Please try again later.'
    );
  });
});
