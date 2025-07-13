import { Component } from 'react';
import { CardList } from './components/card-list/card-list';
import { Search } from './components/search/search';
import type { AppState, CardProps } from './types/types';

class App extends Component<object, AppState> {
  state: AppState = {
    animals: [],
    loading: false,
  };

  setAnimals = (animals: Array<CardProps>) => {
    this.setState({ animals: animals });
  };

  setLoading = (loading: boolean) => {
    this.setState({ loading });
  };

  render() {
    return (
      <>
        <Search
          setCardState={this.setAnimals}
          setLoading={this.setLoading}
        ></Search>
        <CardList
          animalsList={this.state.animals}
          loading={this.state.loading}
        ></CardList>
      </>
    );
  }
}

export default App;
