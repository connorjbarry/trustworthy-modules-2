import { type IndivPkg } from "@prisma/client";
import React from "react";

const MetricsTable = ({ pkg }: { pkg: IndivPkg | undefined }) => {
  if (!pkg)
    return (
      <div className="flex items-center justify-center">
        There is no package found for this id
      </div>
    );
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-left text-sm text-gray-400">
        <thead className="bg-gray-700 text-xs uppercase text-gray-400">
          <tr>
            <th scope="col" className=" px-6 py-3">
              Metric
            </th>
            <th scope="col" className=" px-6 py-3">
              Score
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(pkg as unknown as string[]).map((key) => {
            if (
              key === "name" ||
              key === "totalScore" ||
              key === "id" ||
              key === "version" ||
              key === "author" ||
              key === "githubLink" ||
              key === "fileURL"
            )
              return null;

            return (
              <>
                <tr className=" bg-gray-800">
                  <th
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-medium uppercase"
                    key={key}
                  >
                    {key.split(/(?=[A-Z])/).join(" ")}
                  </th>
                  <td className="px-6 py-4">{pkg[key]}</td>
                </tr>
              </>
            );
          })}
        </tbody>
        <tfoot>
          <tr className="font-semibold">
            <th scope="row" className="px-6 py-3 text-base">
              Total
            </th>
            <td className="px-6 py-3">
              {pkg["totalScore"] as unknown as number}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default MetricsTable;
