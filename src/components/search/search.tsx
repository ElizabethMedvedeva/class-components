import React from 'react';
import { searchRequest } from '../../api/apiClient';

export interface SearchProps {
  onSearch?: (term: string) => void;
  setCardState: (animal: any) => void;
}
export interface SearchState {
  inputValue: string;
}

export class Search extends React.Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      inputValue: '',
    };
    this.setCardState = props.setCardState;
  }
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: event.target.value });
  };
  handleSearch = async () => {
    const animalResponse = await searchRequest(this.state.inputValue);
    this.setCardState(animalResponse.animals);
  };

  async componentDidMount(): void {
    const animalResponse = await searchRequest('');
    this.props.setCardState(animalResponse.animals);
  }
  componentDidUpdate(
    prevProps?: Readonly<{}>,
    prevState?: Readonly<CardListState>,
    snapshot?: any
  ): void {}
  componentWillUnmount(): void {}

  render() {
    return (
      <>
        <div className="w-full bg-black flex items-center justify-between py-4 px-8 shadow-md">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="logo" className="w-[35px] h-[35px]" />
            <h2 className="text-yellow-300 text-xl font-bold">Pet Shop</h2>
          </div>

          <div className="flex items-center gap-4">
            <input
              type="text"
              value={this.state.inputValue}
              onChange={this.handleChange}
              placeholder="Find your pet"
              className="px-3 py-2 border-2 border-yellow-300 bg-black text-yellow-300 rounded-md outline-none placeholder-yellow-400"
            />
            <button
              onClick={this.handleSearch}
              className="cursor-pointer bg-yellow-300 text-black px-4 py-2 rounded-md font-semibold transition duration-300 hover:bg-black hover:text-yellow-300 hover:border-yellow-300 border-2 border-transparent"
            >
              Tap to search
            </button>
          </div>
        </div>
      </>
    );
  }
}
