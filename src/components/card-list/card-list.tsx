import React from 'react';
import { Card } from '../card/card';
import type { CardListProps } from '../../types/interfaces';

export class CardList extends React.Component<CardListProps> {
  render() {
    const { animalsList, loading } = this.props;

    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-yellow-300 border-solid"></div>
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
      </div>
    );
  }
}
