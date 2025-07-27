export type CardProps = {
  name: string;
  uid: string;
  avian: boolean;
  canine: boolean;
  feline: boolean;
  earthAnimal: boolean;
  earthInsect: boolean;
};

export type AppState = {
  animals: CardProps[];
  loading: boolean;
  error: string | null;
};

export type CardListProps = {
  animalsList: CardProps[];
  loading: boolean;
  error: string | null;
  onNextPage: () => void;
  onPrevPage: () => void;
  currentPage: number;
};

export type SearchState = {
  inputValue: string;
};

export type SearchProps = {
  onSearch?: (term: string) => void;
};

export type SearchResponse = {
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
};
