import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CardList } from '../components/card-list/card-list';

describe('Displays "no results" message when data array is empty', () => {
  it('Displays "no results" message when data array is empty', () => {
    render(<CardList animalsList={[]} loading={false} error={null} />);

    const message = screen.getByText(/no animals found/i);
    expect(message).toBeInTheDocument();
  });
});
