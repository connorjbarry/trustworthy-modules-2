import React, { useState } from "react";
import { GrFormClose } from "react-icons/gr";
import { Button, ButtonVariant } from "./Button/Button";
import { api } from "../utils/api";
// import { type UseTRPCQueryResult } from "@trpc/react-query/shared";
// import { type IndivPkg } from "@prisma/client";

type PackageInfo = {
  name: string;
  url: string;
  author: string;
  version: string;
  file: string;
};

const AddPackageModal = ({
  setShowModal,
}: // pkgs,
{
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  // pkgs: UseTRPCQueryResult<IndivPkg[], any>;
}) => {
  const [packageInfo, setPackageInfo] = useState<PackageInfo>({
    name: "",
    url: "",
    author: "",
    version: "",
    file: "",
  });

  const packageUpload = api.packages.createPackage.useMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPackageInfo({
      ...packageInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handlePackageUpload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    packageUpload.mutate(packageInfo);
    setShowModal(false);
    // await pkgs.refetch().catch((err) => console.log(err));
  };

  return (
    <div
      tabIndex={-1}
      data-testid="add-package-modal"
      className="relative inset-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden p-4"
    >
      <div className="relative h-auto w-full max-w-md">
        <div className="relative rounded-lg bg-gray-700 shadow">
          <button
            className="absolute top-3 right-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm hover:bg-gray-800"
            onClick={() => setShowModal(false)}
          >
            <GrFormClose />
            <span className="sr-only">Close modal</span>
          </button>
          <div className="py-6 px-8">
            <h3 className="mb-4 text-xl font-medium">
              Add a Package to the Registry
            </h3>
            <form className="space-y-6" onSubmit={handlePackageUpload}>
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium"
                >
                  Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={handleInputChange}
                  className="block w-full rounded-lg border border-gray-500 bg-gray-600 p-2.5 text-sm text-white placeholder-gray-400"
                  placeholder="Express"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="url"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Github Url
                </label>
                <input
                  type="text"
                  name="url"
                  id="url"
                  onChange={handleInputChange}
                  placeholder="https://github.com/expressjs/express"
                  className="block w-full rounded-lg border border-gray-500 bg-gray-600 p-2.5 text-sm text-white placeholder-gray-400"
                />
              </div>
              <div>
                <label
                  htmlFor="author"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Author
                </label>
                <input
                  type="text"
                  name="author"
                  id="author"
                  onChange={handleInputChange}
                  placeholder="ExpressJS"
                  className="block w-full rounded-lg border border-gray-500 bg-gray-600 p-2.5 text-sm text-white placeholder-gray-400"
                />
              </div>
              <div>
                <label
                  htmlFor="version"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Version
                </label>
                <input
                  type="text"
                  name="version"
                  id="version"
                  onChange={handleInputChange}
                  placeholder="1.x.x"
                  className="block w-full rounded-lg border border-gray-500 bg-gray-600 p-2.5 text-sm text-white placeholder-gray-400"
                />
              </div>
              <div>
                <label
                  htmlFor="upload"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Upload Package <span className="text-red-400">*</span>
                </label>
                <input
                  type="file"
                  name="upload"
                  id="upload"
                  onChange={handleInputChange}
                  className="block w-full rounded-lg border border-gray-500 bg-gray-600 p-2.5 text-sm text-white placeholder-gray-400"
                />
              </div>
              <Button
                variant={ButtonVariant.Primary}
                type="submit"
                className="w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium focus:outline-none focus:ring-4"
              >
                Submit Package
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPackageModal;
