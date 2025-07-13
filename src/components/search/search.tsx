import React from 'react';

export interface SearchProps {
  onSearch?: (term: string) => void;
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
  }
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: event.target.value });
  };

  render() {
    return (
      <>
        <div>
          <h2>Search</h2>
        </div>
        <div>
          <input
            type="text"
            value={this.state.inputValue}
            onChange={this.handleChange}
            placeholder="Find your pet"
          ></input>
          <button>Tap to search</button>
        </div>
      </>
    );
  }
}
