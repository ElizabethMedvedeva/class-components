import { Component } from 'react';
import { CardList } from './components/card-list/card-list';
import { Search } from './components/search/search';
import type { AppState, CardProps } from './types/types';

class App extends Component<object, AppState> {
  state: AppState = {
    animals: [],
  };

  setAnimals = (animals: Array<CardProps>) => {
    this.setState({ animals: animals });
  };

  render() {
    return (
      <>
        <Search setCardState={this.setAnimals}></Search>
        <CardList animalsList={this.state.animals}></CardList>
      </>
    );
  }
}

export default App;
