import React from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

export default function SearchBar({ searchQuery, setSearchQuery, isDarkMode }) {
  const handleClear = () => {
    setSearchQuery('');
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <FiSearch className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}`} />
        <input
          type="text"
          placeholder="What do you want to learn today?"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full pl-12 pr-12 py-3 md:py-4 border-2 rounded-xl text-body-md focus:outline-none transition-colors-smooth ${isDarkMode ? 'bg-neutral-700 border-neutral-600 text-white placeholder:text-neutral-400 focus:border-primary-400' : 'border-neutral-300 text-neutral-900 placeholder:text-neutral-500 focus:border-primary-500'}`}
          aria-label="Search courses"
        />
        {searchQuery && (
          <button
            onClick={handleClear}
            className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors-smooth p-1 ${isDarkMode ? 'text-neutral-500 hover:text-neutral-300' : 'text-neutral-400 hover:text-neutral-600'}`}
            aria-label="Clear search"
          >
            <FiX className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
