/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import SearchBar from "../../components/SearchBar";
import { Button, ButtonVariant } from "../../components/Button/Button";
import AddPackageModal from "../../components/AddPackageModal";
import PackagesTable from "../../components/Table/PackagesTable";
import { api } from "../../utils/api";
import { type IndivPkg } from "@prisma/client";
import LoadingSpinner, { LoadingColor } from "../../components/LoadingSpinner";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

const Packages = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [showAddPackageModal, setShowAddPackageModal] =
    useState<boolean>(false);
  let filteredPkgs: any;

  const { data: session } = useSession();
  const currentUser = api.user.getCurrentUser.useQuery({
    email: session?.user?.email,
  });

  const isAdmin = currentUser?.data?.role === "ADMIN";
  const isUser = currentUser?.data?.role === "USER";

  const { data, isLoading, refetch } = api.packages.getAll.useQuery();

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <LoadingSpinner variant={LoadingColor.Primary} />
      </div>
    );
  if (searchInput !== "") {
    filteredPkgs =
      data?.filter(
        (pkg) =>
          pkg.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          pkg.author?.toLowerCase().includes(searchInput.toLowerCase())
      ) ?? null;
    if ((filteredPkgs as IndivPkg[]).length === 0) filteredPkgs = null;
  }

  if (!isUser && !isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="text-2xl">You are not authorized to view this page</div>

        <Link href="/api/auth/signin">
          <span className="flex items-center justify-center">
            <p className=" text-blue-400 underline">Sign in</p>
            &nbsp;here
          </span>
        </Link>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Package</title>
        <meta name="description" content="Find a Package" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`flex w-full items-center justify-between gap-4 ${
          showAddPackageModal ? "opacity-80" : ""
        }`}
      >
        <div className="mx-4 w-full" data-testid="package-search-bar">
          <SearchBar input={searchInput} setInput={setSearchInput} />
        </div>
        <Button
          variant={isAdmin ? ButtonVariant.Success : ButtonVariant.Disabled}
          className={`mr-2 h-full min-w-max`}
          data-testid="add-package-btn"
          onClick={() => setShowAddPackageModal(true)}
          disabled={!isAdmin}
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
      <div className={`mt-6 p-4 ${showAddPackageModal ? "hidden" : ""}`}>
        {data && data !== null ? (
          filteredPkgs && filteredPkgs !== null ? (
            <PackagesTable
              pkgs={filteredPkgs as IndivPkg[]}
              refetch={refetch}
            />
          ) : (
            <PackagesTable pkgs={data} refetch={refetch} />
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
