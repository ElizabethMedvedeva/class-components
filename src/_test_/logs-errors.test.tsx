import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ErrorBoundary } from '../components/error-boundary/error-boundary';

describe('Logs error to console', () => {
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
