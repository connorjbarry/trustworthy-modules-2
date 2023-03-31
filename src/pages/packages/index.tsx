/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import SearchBar from "../../components/SearchBar";
import { Button, ButtonVariant } from "../../components/Button/Button";
import AddPackageModal from "../../components/AddPackageModal";
import PackagesTable from "../../components/Table/PackagesTable";
import { api } from "../../utils/api";
import { type IndivPkg } from "@prisma/client";
// import { useSession } from "next-auth/react";

const Packages = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [showAddPackageModal, setShowAddPackageModal] =
    useState<boolean>(false);
  let filteredPkgs: any;

  const { data, isLoading, refetch } = api.packages.getAll.useQuery();
  if (isLoading)
    return <div className="flex items-center justify-center">Loading...</div>;
  if (searchInput !== "") {
    filteredPkgs =
      data?.filter(
        (pkg) =>
          pkg.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          pkg.author?.toLowerCase().includes(searchInput.toLowerCase())
      ) ?? null;
    if ((filteredPkgs as IndivPkg[]).length === 0) filteredPkgs = null;
  }

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
            refetch={refetch}
          />
        )}
      </div>
      <div className="mt-6 p-4">
        {data && data !== null ? (
          filteredPkgs && filteredPkgs !== null ? (
            <PackagesTable pkgs={filteredPkgs as IndivPkg[]} />
          ) : (
            <PackagesTable pkgs={data} />
          )
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
