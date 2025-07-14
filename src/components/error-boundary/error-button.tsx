import React from 'react';

export class ErrorButton extends React.Component {
  state = {
    hasError: false,
  };

  render() {
    if (this.state.hasError) {
      throw new Error('Something went wrong. Please, try again later.');
    }

    return (
      <div className="mt-6 flex justify-end">
        <button
          onClick={() => {
            this.setState({ hasError: true });
          }}
          className="cursor-pointer bg-yellow-400 text-black px-4 py-2 rounded-md border border-yellow-500 hover:bg-yellow-500 mb-4 mr-4"
        >
          Throw Error
        </button>
      </div>
    );
  }
}
