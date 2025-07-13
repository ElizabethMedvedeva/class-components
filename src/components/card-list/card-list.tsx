import React from 'react';
import type { CardListState } from '../../types/types';
import { Card } from '../card/card';
import type { CardListProps } from '../../types/interfaces';

export class CardList extends React.Component<CardListProps, CardListState> {
  constructor(props: CardListProps) {
    super(props);
    this.state = {
      animals: props.animalsList,
      loading: false,
      error: null,
    };
  }

  componentDidUpdate(prevProps: CardListProps): void {
    if (prevProps.animalsList !== this.props.animalsList) {
      this.setState({ animals: this.props.animalsList });
    }
  }

  render() {
    const { animals, loading } = this.state;

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
        {animals.length === 0 && <p>No animals found.</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {animals.map((animal) => (
            <Card key={animal.uid} {...animal} />
          ))}
        </div>
      </div>
    );
  }
}
