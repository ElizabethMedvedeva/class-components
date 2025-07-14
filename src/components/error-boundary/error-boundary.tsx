import React, { type ReactNode } from 'react';

export type ErrorBoundaryProps = {
  children: ReactNode;
};
export type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};
export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.log('in getDerivedStateFromError');
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log('ErrorBoundary caught an error:', error, errorInfo);
  }
  handleReset = () => {
    this.setState({ hasError: false });
  };
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Something went wrong.
          </h1>
          <button
            onClick={this.handleReset}
            className="bg-yellow-300 text-black px-4 py-2 rounded-md hover:bg-yellow-400"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
