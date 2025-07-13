import React from 'react';
import type { CardListState } from '../../types/types';
import { Card } from '../card/card';

export class CardList extends React.Component<{}, CardListState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      animals: props.animalsList,
      loading: false,
      error: null,
    };
    console.log(props.animalsList);
  }
  componentDidMount(): void {}
  componentDidUpdate(
    prevProps?: Readonly<{}>,
    prevState?: Readonly<CardListState>,
    snapshot?: any
  ): void {
    if (prevProps.animalsList !== this.props.animalsList) {
      this.setState({ animals: this.props.animalsList });
    }
  }
  componentWillUnmount(): void {}
  render() {
    const { animals, loading, error } = this.state;

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
      <div>
        <h2>List of items</h2>
        {animals.length === 0 && <p>No animals found.</p>}
        {animals.map((animal) => (
          <Card key={animal.uid} {...animal} />
        ))}
      </div>
    );
  }
}
