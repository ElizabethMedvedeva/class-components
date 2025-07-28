import { useEffect, useState } from 'react';
import { CardList } from '../../components/card-list/card-list';
import { ErrorBoundary } from '../../components/error-boundary/error-boundary';
import { ErrorButton } from '../../components/error-boundary/error-button';
import { Search } from '../../components/search/search';
import { searchRequest } from '../../api/apiClient';
import type { AppState } from '../../types/types';
import { ITEMS_PER_PAGE } from '../../utils/constants';

export const Main: React.FC = () => {
  const [animals, setAnimals] = useState<AppState['animals']>([]);
  const [loading, setLoading] = useState<AppState['loading']>(false);
  const [error, setError] = useState<AppState['error']>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(0);

  const fetchAnimals = async (term: string, page: number) => {
    setLoading(true);
    try {
      const response = await searchRequest(term, page, ITEMS_PER_PAGE);
      setAnimals(response.animals || []);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to load animals.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimals('', 0);
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(0);
    fetchAnimals(term, 0);
  };

  const handleNextPage = () => {
    const next = currentPage + 1;
    setCurrentPage(next);
    fetchAnimals(searchTerm, next);
  };

  const handlePrevPage = () => {
    const prev = Math.max(currentPage - 1, 0);
    setCurrentPage(prev);
    fetchAnimals(searchTerm, prev);
  };

  return (
    <>
      <Search onSearch={handleSearch} />
      <ErrorBoundary>
        <CardList
          animalsList={animals}
          loading={loading}
          error={error}
          onNextPage={handleNextPage}
          onPrevPage={handlePrevPage}
          currentPage={currentPage}
        />
        <ErrorButton />
      </ErrorBoundary>
    </>
  );
};
