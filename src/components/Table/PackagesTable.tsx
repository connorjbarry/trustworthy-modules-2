import { type IndivPkg } from "@prisma/client";
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
                        {pkg[pkgInfo] ? pkg[pkgInfo] : "N/A"}
                      </th>
                    );
                })}
                <td className="px-6 py-4">
                  <Button variant={ButtonVariant.Primary}>Download</Button>
                </td>
              </tr>
            );
          })}
          {/* <tr className="border-b border-gray-700 bg-gray-800">
            <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium">
              Apple MacBook Pro 17
            </th>
            <td className="px-6 py-4">Silver</td>
            <td className="px-6 py-4">Laptop</td>
            <td className="px-6 py-4">$2999</td>
          </tr>
          <tr className="border-b  border-gray-700 bg-gray-800">
            <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium">
              Microsoft Surface Pro
            </th>
            <td className="px-6 py-4">White</td>
            <td className="px-6 py-4">Laptop PC</td>
            <td className="px-6 py-4">$1999</td>
          </tr>
          <tr className=" bg-gray-800">
            <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium">
              Magic Mouse 2
            </th>
            <td className="px-6 py-4">Black</td>
            <td className="px-6 py-4">Accessories</td>
            <td className="px-6 py-4">$99</td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default PackagesTable;
