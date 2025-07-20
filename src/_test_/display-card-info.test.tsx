import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Card } from '../components/card/card';

describe('Card component displays name, UID, and boolean properties', () => {
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
});
