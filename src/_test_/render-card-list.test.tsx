import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CardList } from '../components/card-list/card-list';

describe('Renders correct number of items when data is provided', () => {
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

    render(<CardList animalsList={mockAnimals} loading={false} error={null} />);

    const items = screen.getAllByRole('heading', { level: 3 });
    expect(items.length).toBe(2);
  });
});
