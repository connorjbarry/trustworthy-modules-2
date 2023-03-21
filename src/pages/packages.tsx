import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import { Button, ButtonVariant } from "../components/Button/Button";
import AddPackageModal from "../components/AddPackageModal";

const Packages = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [showAddPackageModal, setShowAddPackageModal] =
    useState<boolean>(false);

  return (
    <>
      <div
        className={`flex w-full items-center justify-between gap-4 ${
          showAddPackageModal ? "opacity-80" : ""
        }`}
      >
        <div className="mx-4 w-full" data-testid="package-search-bar">
          <SearchBar input={searchInput} setInput={setSearchInput} />
        </div>
        <Button
          variant={ButtonVariant.Danger}
          className="mr-2 h-full min-w-max"
          data-testid="add-package-btn"
          onClick={() => setShowAddPackageModal(true)}
        >
          Add Package
        </Button>
      </div>
      <div className="flex items-center justify-center">
        {showAddPackageModal && (
          <AddPackageModal setShowModal={setShowAddPackageModal} />
        )}
      </div>
      <p>{searchInput}</p>
    </>
  );
};

export default Packages;
