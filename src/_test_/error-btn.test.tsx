import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ErrorButton } from '../components/error-boundary/error-button';

describe('Throws error when test button is clicked', () => {
  it('Throws error when test button is clicked', () => {
    render(<ErrorButton />);
    const errorButton = screen.getByRole('button', { name: /throw error/i });
    expect(() => {
      fireEvent.click(errorButton);
      screen.getByRole('button', { name: /throw error/i });
    }).toThrow('Something went wrong. Please, try again later.');
  });
});
