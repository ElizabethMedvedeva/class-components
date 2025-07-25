import React, { useEffect, useState } from 'react';
import { searchRequest } from '../../api/apiClient';
import type { SearchProps } from '../../types/types';

export const Search: React.FC<SearchProps> = ({
  setLoading,
  setCardState,
  setError,
  onSearch,
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearch = async () => {
    const trimmedInput = inputValue.trim();
    setLoading(true);

    try {
      localStorage.setItem('searchTerm', trimmedInput);

      const animalResponse = await searchRequest(trimmedInput);
      setCardState(animalResponse.animals);

      if (onSearch) {
        onSearch(trimmedInput);
      }
    } catch (error) {
      console.error('Search failed:', error);
      setError('Something went wrong while searching. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchInitialSearch = async () => {
      const savedTerm = localStorage.getItem('searchTerm')?.trim() || '';
      setInputValue(savedTerm);
      setLoading(true);

      try {
        const animalResponse = await searchRequest(savedTerm);
        setCardState(animalResponse.animals);
      } catch (error) {
        console.error(error);
        setError(
          'Something went wrong while searching. Please try again later.'
        );
      } finally {
        setLoading(false);
      }
    };
    fetchInitialSearch();
  }, [setLoading, setCardState, setError]);

  return (
    <>
      <div className="w-full bg-black flex items-center justify-between py-4 px-8 shadow-md">
        <div className="flex items-center gap-2">
          <img src="logo.png" alt="logo" className="w-[35px] h-[35px]" />
          <h2 className="text-yellow-300 text-xl font-bold">Pet Shop</h2>
        </div>

        <div className="flex items-center gap-4">
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Find your pet"
            className="px-3 py-2 border-2 border-yellow-300 bg-black text-yellow-300 rounded-md outline-none placeholder-yellow-400"
          />
          <button
            onClick={handleSearch}
            className="cursor-pointer bg-yellow-300 text-black px-4 py-2 rounded-md font-semibold transition duration-300 hover:bg-black hover:text-yellow-300 hover:border-yellow-300 border-2 border-transparent"
          >
            Tap to search
          </button>
        </div>
      </div>
    </>
  );
};
