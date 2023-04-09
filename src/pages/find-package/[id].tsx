import { useRouter } from "next/router";
import React from "react";
import LoadingSpinner, { LoadingColor } from "~/components/LoadingSpinner";
import MetricsTable from "../../components/Table/MetricsTable";
import ActionsTable from "../../components/Table/ActionsTable";
import { api } from "../../utils/api";

const IndvidualPackage = () => {
  const router = useRouter();
  const { id } = router.query;
  const pkgid = id as string;
  const pkg = api.packages.getOne.useQuery({ id: pkgid});
  if (pkg.isLoading)
    return (
      <div className="flex items-center justify-center">
        <LoadingSpinner variant={LoadingColor.Primary} />
      </div>
    );

  return (
    <div className="grid grid-cols-3">
      <div className="col-span-2 flex flex-col items-center justify-center">
        <div className="text-5xl font-bold m-4 p-4">{pkg.data?.name}</div>
        <ActionsTable pkgid={id as string} />
      </div>
      <div className="col-span-1 flex items-center justify-center p-4">
        <MetricsTable pkg={pkg.data} />
      </div>
    </div>
  );
};

export default IndvidualPackage;
