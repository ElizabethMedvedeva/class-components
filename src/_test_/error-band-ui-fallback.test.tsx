import { describe, expect, it, vi } from 'vitest';
import { ErrorBoundary } from '../components/error-boundary/error-boundary';
import { ErrorButton } from '../components/error-boundary/error-button';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Triggers error boundary fallback UI', () => {
  it('Triggers error boundary fallback UI', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    const errorButton = screen.getByRole('button', { name: /throw error/i });
    fireEvent.click(errorButton);

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /try again/i })
    ).toBeInTheDocument();

    errorSpy.mockRestore();
  });
});
