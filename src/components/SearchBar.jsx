import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className="flex justify-center mb-4">
      <input
        type="text"
        className="w-full md:w-1/2 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-blue-600 outline-none"
        placeholder="Search for properties..."
        value={query}
        onChange={handleInputChange}
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition duration-300">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
