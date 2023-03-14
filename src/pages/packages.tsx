import React from "react";
import SearchBar from "~/components/SearchBar";
import { Button, ButtonVariant } from "~/components/Button/Button";

const Packages = () => {
  return (
    <>
      <div className="flex w-full items-center justify-between gap-4">
        <div className="mx-4 w-full">
          <SearchBar />
        </div>
        <Button variant={ButtonVariant.Danger} className="min-w-max">
          Add Package
        </Button>
      </div>
    </>
  );
};

export default Packages;
