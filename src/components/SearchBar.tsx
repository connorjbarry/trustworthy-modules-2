import React from "react";
import SearchIcon from "./Icons/SearchIcon";

const SearchBar = ({
  input,
  setInput,
}: {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const onPackageSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
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
          onChange={onPackageSearchInput}
          className="block w-full rounded-lg border border-gray-700 bg-[#0E1117] p-4 pl-10 text-sm text-white focus:outline-none"
          placeholder="Search Packages..."
          required
        />
      </div>
    </form>
  );
};

export default SearchBar;
