import { Component } from 'react';
import { CardList } from './components/card-list/card-list';
import { Search } from './components/search/search';
import type { AppState, CardProps } from './types/types';
import { ErrorButton } from './components/error-boundary/error-button';
import { ErrorBoundary } from './components/error-boundary/error-boundary';

class App extends Component<object, AppState> {
  state: AppState = {
    animals: [],
    loading: false,
    error: null,
  };

  setAnimals = (animals: Array<CardProps>) => {
    this.setState({ animals: animals });
  };

  setLoading = (loading: boolean) => {
    this.setState({ loading });
  };

  setError = (error: string | null) => {
    this.setState({ error });
  };
  render() {
    return (
      <>
        <Search
          setCardState={this.setAnimals}
          setLoading={this.setLoading}
          setError={this.setError}
        ></Search>
        <ErrorBoundary>
          <CardList
            animalsList={this.state.animals}
            loading={this.state.loading}
            error={this.state.error}
          ></CardList>
          <ErrorButton />
        </ErrorBoundary>
      </>
    );
  }
}

export default App;
