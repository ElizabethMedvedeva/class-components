import { describe, expect, it, vi } from 'vitest';
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
});
