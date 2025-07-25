import { useState } from 'react';
import { CardList } from './components/card-list/card-list';
import { Search } from './components/search/search';
import type { AppState } from './types/types';
import { ErrorButton } from './components/error-boundary/error-button';
import { ErrorBoundary } from './components/error-boundary/error-boundary';

const App: React.FC = () => {
  const [animals, setAnimals] = useState<AppState['animals']>([]);
  const [loading, setLoading] = useState<AppState['loading']>(false);
  const [error, setError] = useState<AppState['error']>(null);

  return (
    <>
      <Search
        setCardState={setAnimals}
        setLoading={setLoading}
        setError={setError}
      ></Search>
      <ErrorBoundary>
        <CardList
          animalsList={animals}
          loading={loading}
          error={error}
        ></CardList>
        <ErrorButton />
      </ErrorBoundary>
    </>
  );
};

export default App;
