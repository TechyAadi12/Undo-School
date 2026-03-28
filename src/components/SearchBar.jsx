import React from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="relative w-full">
      <FiSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
      <input
        type="text"
        placeholder="Search by title, domain, or instructor"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        className="w-full rounded-[1.75rem] border border-slate-200 bg-white px-12 py-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
        aria-label="Search courses"
      />
      {searchQuery && (
        <button
          type="button"
          onClick={() => setSearchQuery('')}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          aria-label="Clear search"
        >
          <FiX className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
