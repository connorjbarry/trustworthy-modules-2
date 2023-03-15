import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import { Button, ButtonVariant } from "../components/Button/Button";

const Packages = () => {
  const [searchInput, setSearchInput] = useState<string>("");

  return (
    <>
      <div className="flex w-full items-center justify-between gap-4">
        <div className="mx-4 w-full" data-testid="package-search-bar">
          <SearchBar input={searchInput} setInput={setSearchInput} />
        </div>
        <Button
          variant={ButtonVariant.Danger}
          className="mr-2 h-full min-w-max"
          data-testid="add-package-btn"
        >
          Add Package
        </Button>
      </div>
      <p>{searchInput}</p>
    </>
  );
};

export default Packages;
