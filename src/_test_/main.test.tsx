import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Main } from '../pages/main/main';
import userEvent from '@testing-library/user-event';

import * as apiClient from '../api/apiClient';

vi.mock('../../api/apiClient');

describe('Main component', () => {
  const mockProps = {
    setLoading: vi.fn(),
    setCardState: vi.fn(),
    setError: vi.fn(),
    onSearch: vi.fn(),
  };
  it('Displays error message when API call fails', async () => {
    const mockedSearchRequest = vi.mocked(apiClient.searchRequest);
    mockedSearchRequest.mockRejectedValueOnce(new Error('Network Error'));

    render(<Main />);

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
