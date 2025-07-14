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
  loading: boolean;
  error: string | null;
};
