import { Component } from 'react';
import { CardList } from './components/card-list/card-list';
import { Search } from './components/search/search';
import type { AppState } from './types/types';
import type { CardProps } from '@mui/material';

class App extends Component<{}, AppState> {
  state: AppState = {
    animals: [],
  };

  setAnimals = (animals) => {
    this.setState({ animals: animals });
    console.log('anrei pidor', animals);
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
