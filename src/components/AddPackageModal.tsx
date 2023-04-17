/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from "react";
import { GrFormClose } from "react-icons/gr";
import { Button, ButtonVariant } from "./Button/Button";
import { api } from "../utils/api";
import type {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "@tanstack/react-query";
// import { type UseTRPCQueryResult } from "@trpc/react-query/shared";
// import { type IndivPkg } from "@prisma/client";

type PackageInfo = {
  name: string;
  link: string;
  author: string;
  version: string;
  fileUrl: string;
};

const AddPackageModal = ({
  setShowModal,
  refetch,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>
  ) => Promise<QueryObserverResult<unknown, unknown>>;
}) => {
  const [packageInfo, setPackageInfo] = useState<PackageInfo>({
    name: "",
    link: "",
    author: "",
    version: "",
    fileUrl: "",
  });

  const { mutate } = api.packages.createPackage.useMutation({
    onSuccess: async () => {
      await refetch();
    },
  });

  const fileToBase64 = (file: File | undefined) =>
    new Promise((resolve, reject) => {
      if (!file) {
        reject("No file");
      }
      const reader = new FileReader();
      reader.readAsDataURL(file as File);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => reject(error);
    });

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "fileUrl" && e.target.files) {
      const base64encoded = await fileToBase64(e.target.files[0]);
      setPackageInfo({
        ...packageInfo,
        [e.target.name]: base64encoded as string,
      });
      return;
    }
    setPackageInfo({
      ...packageInfo,
      [e.target.name]: e.target.value,
    });
  };

  const setPackageUrl = () => {
    if (packageInfo.author && packageInfo.name) {
      setPackageInfo({
        ...packageInfo,
        link: `https://github.com/${packageInfo.author.toLowerCase()}/${packageInfo.name.toLowerCase()}`,
      });
    }
  };

  const handlePackageUpload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(packageInfo);
    mutate(packageInfo);
    setShowModal(false);
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
            <form
              className="space-y-6"
              onSubmit={(e) => handlePackageUpload(e)}
            >
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
                  htmlFor="author"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Author <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="author"
                  id="author"
                  onChange={handleInputChange}
                  placeholder="ExpressJS"
                  className="block w-full rounded-lg border border-gray-500 bg-gray-600 p-2.5 text-sm text-white placeholder-gray-400"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="version"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Version <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="version"
                  id="version"
                  onChange={handleInputChange}
                  placeholder="1.x.x"
                  className="block w-full rounded-lg border border-gray-500 bg-gray-600 p-2.5 text-sm text-white placeholder-gray-400"
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
                  htmlFor="file"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Upload Package <span className="text-red-400">*</span>
                </label>
                <input
                  type="file"
                  name="fileUrl"
                  id="file"
                  onChange={handleInputChange}
                  className="block w-full rounded-lg border border-gray-500 bg-gray-600 p-2.5 text-sm text-white placeholder-gray-400"
                  required
                />
              </div>
              <Button
                variant={ButtonVariant.Primary}
                type="submit"
                className="w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium focus:outline-none focus:ring-4"
                onClick={setPackageUrl}
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
