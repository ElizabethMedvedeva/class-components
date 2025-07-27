import type { CardListProps } from '../../types/types';
import { Card } from '../card/card';

export const CardList: React.FC<CardListProps> = ({
  animalsList,
  loading,
  error,
  onNextPage,
  onPrevPage,
  currentPage,
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-yellow-300 border-solid"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-md text-center">
        {error}
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">List of items</h2>
      {animalsList.length === 0 && <p>No animals found.</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        {animalsList.map((animal) => (
          <Card key={animal.uid} {...animal} />
        ))}
      </div>

      <div className="flex justify-center items-center gap-4">
        <button
          onClick={onPrevPage}
          disabled={currentPage === 0}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="font-medium">Page {currentPage + 1}</span>
        <button onClick={onNextPage} className="px-4 py-2 bg-gray-200 rounded">
          Next
        </button>
      </div>
    </div>
  );
};
