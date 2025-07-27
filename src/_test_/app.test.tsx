import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';

vi.mock('../api/apiClient', () => ({
  searchRequest: vi.fn(),
}));
import { searchRequest } from '../api/apiClient';

describe('App component tests', () => {
  // Handles API error and displays error message
  it('Handles API error responses', async () => {
    localStorage.setItem('searchTerm', 'fail');

    (searchRequest as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error('Network error')
    );

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/failed to load animals/i)).toBeInTheDocument();
    });
  });

  // Makes initial API call with saved search term on mount
  it('Makes initial API call on component mount', async () => {
    (searchRequest as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      animals: [{ uid: '1', name: 'Doggo', avian: false, canine: true }],
    });

    render(<App />);

    await waitFor(() => {
      expect(searchRequest).toHaveBeenCalledWith('', 0, 6);
      expect(screen.getByText(/doggo/i)).toBeInTheDocument();
    });
  });

  // Displays results correctly on successful API response
  it('Handles successful API responses', async () => {
    localStorage.setItem('searchTerm', 'phoenix');

    const mockAnimals = [
      { uid: '123', name: 'Phoenix', feline: true },
      { uid: '456', name: 'Cat', canine: true },
    ];

    (searchRequest as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      animals: mockAnimals,
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/phoenix/i)).toBeInTheDocument();
      expect(screen.getByText(/cat/i)).toBeInTheDocument();
    });
  });
});
