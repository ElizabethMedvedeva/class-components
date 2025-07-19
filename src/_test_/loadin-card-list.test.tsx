import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CardList } from '../components/card-list/card-list';

describe('Shows loading state while fetching data', () => {
  it('Shows loading state while fetching data', () => {
    render(<CardList animalsList={[]} loading={true} error={null} />);
    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });
});
