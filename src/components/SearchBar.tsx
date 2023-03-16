import React from "react";
import SearchIcon from "./Icons/SearchIcon";

const SearchBar = ({
  input,
  setInput,
}: {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <form>
      <label
        htmlFor="default-search"
        className="sr-only mb-2 text-sm font-medium text-gray-900"
      >
        Search
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <SearchIcon />
        </div>
        <input
          type="search"
          id="default-search"
          data-testid="package-search-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="block w-full rounded-lg border border-gray-700 bg-[#0E1117] p-4 pl-10 text-sm text-white focus:outline-none"
          placeholder="Search Packages..."
          required
        />
        <button
          type="submit"
          className="absolute right-2.5 bottom-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
