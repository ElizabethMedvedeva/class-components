import { describe, expect, it, vi } from 'vitest';
import { ErrorBoundary } from '../components/error-boundary/error-boundary';
import { ErrorButton } from '../components/error-boundary/error-button';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Error Boundary component tests', () => {
  // Checks fallback UI is shown when the error button is clicked
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

  // Checks that errors in child components are caught and handled
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

  // Checks that the button throws an error when clicked
  it('Throws error when test button is clicked', () => {
    render(<ErrorButton />);
    const errorButton = screen.getByRole('button', { name: /throw error/i });
    expect(() => {
      fireEvent.click(errorButton);
      screen.getByRole('button', { name: /throw error/i });
    }).toThrow('Something went wrong. Please, try again later.');
  });

  // Checks that fallback UI is displayed when an error occurs
  it('Displays fallback UI when error occurs', () => {
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
  });

  // Checks that the error is logged to the console
  it('Logs error to console', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const ThrowingComponent = () => {
      throw new Error('Test error');
    };
    render(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>
    );
    expect(errorSpy).toHaveBeenCalled();
    errorSpy.mockRestore();
  });
});
