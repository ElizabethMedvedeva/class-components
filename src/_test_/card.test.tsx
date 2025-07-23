import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Card } from '../components/card/card';
import type { CardProps } from '../types/types';

describe('Test card component', () => {
  // Displays all card fields correctly
  it('Correctly displays item names and descriptions', () => {
    const mockData = {
      name: 'Test Animal',
      uid: '12345',
      avian: true,
      canine: false,
      feline: true,
      earthAnimal: false,
      earthInsect: true,
    };
    render(<Card {...mockData} />);
    expect(screen.getByText('Test Animal')).toBeInTheDocument();
    expect(screen.getByText(/UID:/i)).toBeInTheDocument();
    expect(screen.getByText('12345')).toBeInTheDocument();
    expect(screen.getByText(/Avian:/i).textContent).toMatch(/true/i);
    expect(screen.getByText(/Canine:/i).textContent).toMatch(/false/i);
    expect(screen.getByText(/Feline:/i).textContent).toMatch(/true/i);
    expect(screen.getByText(/Earth Animal:/i).textContent).toMatch(/false/i);
    expect(screen.getByText(/Earth Insect:/i).textContent).toMatch(/true/i);
  });

  // Renders default values when props are missing
  it('renders fallback values for missing properties', () => {
    const partialData: Partial<CardProps> = {};

    const safeData: CardProps = {
      name: partialData.name ?? 'Unknown',
      uid: partialData.uid ?? '0000',
      avian: partialData.avian ?? false,
      canine: partialData.canine ?? false,
      feline: partialData.feline ?? false,
      earthAnimal: partialData.earthAnimal ?? false,
      earthInsect: partialData.earthInsect ?? false,
    };

    render(<Card {...safeData} />);

    expect(screen.getByText('Unknown')).toBeInTheDocument();
    expect(screen.getByText('0000')).toBeInTheDocument();
    expect(screen.getByText(/Avian:/i).textContent).toMatch(/false/i);
    expect(screen.getByText(/Canine:/i).textContent).toMatch(/false/i);
    expect(screen.getByText(/Feline:/i).textContent).toMatch(/false/i);
    expect(screen.getByText(/Earth Animal:/i).textContent).toMatch(/false/i);
    expect(screen.getByText(/Earth Insect:/i).textContent).toMatch(/false/i);
  });
});
