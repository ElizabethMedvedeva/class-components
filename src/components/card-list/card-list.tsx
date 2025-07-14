import React from 'react';
import { Card } from '../card/card';
import type { CardListProps } from '../../types/interfaces';

export class CardList extends React.Component<CardListProps> {
  render() {
    const { animalsList, loading, error } = this.props;

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {animalsList.map((animal) => (
            <Card key={animal.uid} {...animal} />
          ))}
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => {
              throw new Error('Test error from CardList!');
            }}
            className="cursor-pointer bg-yellow-400 text-black px-4 py-2 rounded-md border border-yellow-500 hover:bg-yellow-500 mb-4 mr-4"
          >
            Throw Error
          </button>
        </div>
      </div>
    );
  }
}
