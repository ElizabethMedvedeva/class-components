import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';

vi.mock('../api/apiClient', () => ({
  searchRequest: vi.fn(),
}));

import { searchRequest } from '../api/apiClient';

describe('Handles successful API responses', () => {
  it('Handles successful API responses', async () => {
    localStorage.setItem('searchTerm', 'phenix');

    const mockAnimals = [
      { uid: '123', name: 'Phenix', feline: true },
      { uid: '456', name: 'Cat', canine: true },
    ];

    (searchRequest as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      animals: mockAnimals,
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/phenix/i)).toBeInTheDocument();
      expect(screen.getByText(/cat/i)).toBeInTheDocument();
    });
  });
});
