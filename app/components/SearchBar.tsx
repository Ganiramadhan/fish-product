import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearch }) => {
  return (
    <div className="flex justify-center mb-4">
      <input
        type="text"
        placeholder="Search products..."
        className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-lg shadow-sm focus:ring focus:ring-blue-500 focus:outline-none transition-all"
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
