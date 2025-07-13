export type CardProps = {
  name: string;
  uid: string;
  avian: boolean;
  canine: boolean;
  feline: boolean;
  earthAnimal: boolean;
  earthInsect: boolean;
};
export type CardListState = {
  animals: CardProps[];
  loading: boolean;
  error: string | null;
};

export type AppState = {
  animals: CardProps[];
};

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
