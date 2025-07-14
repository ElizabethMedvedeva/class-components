import type { CardProps } from './types';

export interface SearchResponse {
  animals: CardProps[];
  page: {
    pageNumber: number;
    pageSize: number;
    numberOfElements: number;
    totalElements: number;
    totalPages: number;
  };
  sort: {
    clauses: unknown[];
  };
}

export interface SearchProps {
  onSearch?: (term: string) => void;
  setCardState: (animal: CardProps[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}
export interface SearchState {
  inputValue: string;
}

export interface CardListProps {
  animalsList: CardProps[];
  loading: boolean;
  error: string | null;
}
