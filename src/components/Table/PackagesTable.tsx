import { type IndivPkg } from "@prisma/client";
import type {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import { api } from "../../utils/api";
import { Button, ButtonVariant } from "../Button/Button";
import LoadingSpinner, { LoadingColor } from "../LoadingSpinner";

const PackagesTable = ({
  pkgs,
  refetch,
}: {
  pkgs: IndivPkg[];
  refetch: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>
  ) => Promise<QueryObserverResult<unknown, unknown>>;
}) => {
  const { mutate, isLoading } = api.packages.deleteOne.useMutation({
    onSuccess: async () => {
      await refetch();
    },
  });

  if (pkgs.length === 0)
    return (
      <div className="mt-6 flex items-center justify-center uppercase">
        There are no packages available
      </div>
    );
  return (
    <div className="relative overflow-x-auto rounded-md">
      <table className="w-full text-sm text-gray-400">
        <thead className="bg-gray-700 text-xs uppercase text-gray-400">
          <tr>
            {Object.keys(pkgs[0] as unknown as string[]).map((key) => {
              if (
                key === "name" ||
                key === "author" ||
                key === "version" ||
                key === "githubLink"
              ) {
                if (key == "githubLink") key = "github link";
                return (
                  <th scope="col" className="px-6 py-3" key={key}>
                    {key}
                  </th>
                );
              }
            })}
            <th scope="col" className="px-6 py-3">
              Options
            </th>
          </tr>
        </thead>
        <tbody>
          {pkgs.map((pkg, idx) => {
            return (
              <tr className="border-b border-gray-700 bg-gray-800" key={idx}>
                {Object.keys(pkg).map((pkgInfo, idx) => {
                  if (
                    pkgInfo === "name" ||
                    pkgInfo === "author" ||
                    pkgInfo === "version" ||
                    pkgInfo === "githubLink"
                  )
                    return (
                      <th
                        scope="row"
                        className="whitespace-nowrap px-6 py-4 font-medium"
                        key={idx}
                      >
                        {pkgInfo === "name" ? (
                          <Link
                            href={`find-package/${pkg["id"]}`}
                            className="hover:text-blue-500 hover:underline"
                          >
                            {pkg[pkgInfo]}
                          </Link>
                        ) : pkg[pkgInfo] ? (
                          pkg[pkgInfo]
                        ) : (
                          "N/A"
                        )}
                      </th>
                    );
                })}
                <td className="flex justify-center space-x-8 py-4 pl-6">
                  {isLoading ? (
                    <LoadingSpinner variant={LoadingColor.Primary} />
                  ) : (
                    <>
                      <Button variant={ButtonVariant.Primary}>Download</Button>
                      <Button
                        variant={ButtonVariant.Danger}
                        onClick={() => {
                          mutate({ id: pkg["id"] });
                        }}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PackagesTable;
