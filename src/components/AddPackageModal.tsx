import React from "react";
import { GrFormClose } from "react-icons/gr";
import { Button, ButtonVariant } from "./Button/Button";

const AddPackageModal = ({
  setShowModal,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div
      tabIndex={-1}
      data-testid="add-package-modal"
      className="inset-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden p-4"
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
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block w-full rounded-lg border border-gray-500 bg-gray-600 p-2.5 text-sm text-white placeholder-gray-400"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="block w-full rounded-lg border border-gray-500 bg-gray-600 p-2.5 text-sm text-white placeholder-gray-400"
                  required
                />
              </div>
              <Button
                variant={ButtonVariant.Primary}
                type="submit"
                className="w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium focus:outline-none focus:ring-4"
              >
                Submit Package
              </Button>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Not registered?{" "}
                <a
                  href="#"
                  className="text-blue-700 hover:underline dark:text-blue-500"
                >
                  Create account
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPackageModal;
