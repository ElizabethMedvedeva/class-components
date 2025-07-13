import React from 'react';
import type { CardListState, CardProps } from '../../types/types';
import { Card } from '../card/card';

interface CardListProps {
  animalsList: CardProps[];
}

export class CardList extends React.Component<CardListProps, CardListState> {
  constructor(props: CardListProps) {
    super(props);
    this.state = {
      animals: props.animalsList,
      loading: false,
      error: null,
    };
    console.log(props.animalsList);
  }

  componentDidUpdate(prevProps: CardListProps): void {
    if (prevProps.animalsList !== this.props.animalsList) {
      this.setState({ animals: this.props.animalsList });
    }
  }

  render() {
    const { animals, loading, error } = this.state;

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

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
