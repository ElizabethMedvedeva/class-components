import React, { useEffect, useState } from 'react';

export const ErrorButton: React.FC = () => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (hasError) {
      throw new Error('Something went wrong. Please, try again later.');
    }
  }, [hasError]);

  return (
    <div className="mt-6 flex justify-end">
      <button
        onClick={() => setHasError(true)}
        className="cursor-pointer bg-yellow-400 text-black px-4 py-2 rounded-md border border-yellow-500 hover:bg-yellow-500 mb-4 mr-4"
      >
        Throw Error
      </button>
    </div>
  );
};
