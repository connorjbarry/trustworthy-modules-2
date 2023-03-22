import React, { useState } from "react";
import SearchBar from "../../components/SearchBar";
import { Button, ButtonVariant } from "../../components/Button/Button";
import AddPackageModal from "../../components/AddPackageModal";
import PackagesTable from "~/components/Table/PackagesTable";
import { api } from "~/utils/api";

const Packages = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [showAddPackageModal, setShowAddPackageModal] =
    useState<boolean>(false);

  const allPkgs = api.packages.getAll.useQuery();

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
          className={`mr-2 h-full min-w-max`}
          data-testid="add-package-btn"
          onClick={() => setShowAddPackageModal(true)}
        >
          Add Package
        </Button>
      </div>
      <div className="z-10 flex items-center justify-center">
        {showAddPackageModal && (
          <AddPackageModal
            setShowModal={setShowAddPackageModal}
            // pkgs={allPkgs}
          />
        )}
      </div>
      <div className="mt-6 p-4">
        {allPkgs.data ? (
          <PackagesTable pkgs={allPkgs.data} />
        ) : (
          <div className="mt-6 flex items-center justify-center">
            There are no packages in the registry
          </div>
        )}
      </div>
    </>
  );
};

export default Packages;
