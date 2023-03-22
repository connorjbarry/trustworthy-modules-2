import { type IndivPkg } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { Button, ButtonVariant } from "../Button/Button";

const PackagesTable = ({ pkgs }: { pkgs: IndivPkg[] }) => {
  return (
    <div className="relative overflow-x-auto rounded-md">
      <table className="w-full text-left text-sm text-gray-400">
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
              Download
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
                            href={`packages/${pkg["id"]}`}
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
                <td className="px-6 py-4">
                  <Button variant={ButtonVariant.Primary}>Download</Button>
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
