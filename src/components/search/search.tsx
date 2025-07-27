import React, { useState } from 'react';
import type { SearchProps } from '../../types/types';
import { useSearchStorage } from '../../hooks/useLocalStorage';

export const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const { saveSearchTerm, getSearchTerm } = useSearchStorage();
  const [inputValue, setInputValue] = useState(getSearchTerm());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClick = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    saveSearchTerm(trimmed);
    onSearch?.(trimmed);
  };

  return (
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
          onClick={handleClick}
          className="cursor-pointer bg-yellow-300 text-black px-4 py-2 rounded-md font-semibold transition duration-300 hover:bg-black hover:text-yellow-300 hover:border-yellow-300 border-2 border-transparent"
        >
          Tap to search
        </button>
      </div>
    </div>
  );
};
