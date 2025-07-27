import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CardList } from '../components/card-list/card-list';
import type { CardListProps } from '../types/types';

const defaultCardListProps: CardListProps = {
  animalsList: [],
  loading: false,
  error: null,
  onNextPage: () => {},
  onPrevPage: () => {},
  currentPage: 0,
};

describe('CardList component', () => {
  // Shows spinner when loading is true
  it('Shows loading state while fetching data', () => {
    const testProps = {
      ...defaultCardListProps,
      loading: true,
    };
    render(<CardList {...testProps} />);
    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });

  // Shows message when no data is available
  it('Displays "no results" message when data array is empty', () => {
    render(<CardList {...defaultCardListProps} />);

    const message = screen.getByText(/no animals found/i);
    expect(message).toBeInTheDocument();
  });

  // Renders correct number of cards
  it('renders correct number of items when data is provided', () => {
    const mockAnimals = [
      {
        name: 'Dog',
        uid: '1',
        avian: false,
        canine: true,
        feline: false,
        earthAnimal: true,
        earthInsect: false,
      },
      {
        name: 'Cat',
        uid: '2',
        avian: false,
        canine: false,
        feline: true,
        earthAnimal: true,
        earthInsect: false,
      },
    ];

    const testProps = {
      ...defaultCardListProps,
      animals: mockAnimals,
    };
    render(<CardList {...testProps} />);
    const items = screen.getAllByRole('heading', { level: 3 });
    expect(items.length).toBe(2);
  });
});
