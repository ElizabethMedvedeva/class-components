import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';

vi.mock('../api/apiClient', () => ({
  searchRequest: vi.fn(),
}));
import { searchRequest } from '../api/apiClient';

describe('Handles API error responses', () => {
  it('Handles API error responses', async () => {
    localStorage.setItem('searchTerm', 'fail');

    (searchRequest as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error('Network error')
    );

    render(<App />);

    await waitFor(() => {
      expect(
        screen.getByText(/something went wrong while searching/i)
      ).toBeInTheDocument();
    });
  });
});
