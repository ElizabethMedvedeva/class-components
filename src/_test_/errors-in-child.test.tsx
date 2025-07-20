import { describe, expect, it, vi } from 'vitest';
import { ErrorBoundary } from '../components/error-boundary/error-boundary';
import { render, screen } from '@testing-library/react';

describe('Catches and handles JavaScript errors in child components', () => {
  it('catches and handles JavaScript errors in child components', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const ThrowingComponent = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /try again/i })
    ).toBeInTheDocument();

    expect(errorSpy).toHaveBeenCalled();
    errorSpy.mockRestore();
  });
});
