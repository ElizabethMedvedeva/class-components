import { describe, expect, it, vi } from 'vitest';
import { searchRequest } from '../api/apiClient';
import { render, waitFor, screen } from '@testing-library/react';
import App from '../App';

vi.mock('../api/apiClient', () => ({
  searchRequest: vi.fn(),
}));

describe('Makes initial API call on component mount', () => {
  it('Makes initial API call on component mount', async () => {
    localStorage.setItem('searchTerm', 'dog');
    (searchRequest as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      animals: [{ uid: '1', name: 'Doggo', avian: false, canine: true }],
    });
    render(<App />);
    await waitFor(() => {
      expect(searchRequest).toHaveBeenCalledWith('dog');
      expect(screen.getByText(/doggo/i)).toBeInTheDocument();
    });
  });
});
