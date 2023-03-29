import { useRouter } from "next/router";
import React from "react";
import MetricsTable from "~/components/Table/MetricsTable";
import { api } from "~/utils/api";

const IndvidualPackage = () => {
  const router = useRouter();
  const { id } = router.query;
  const pkg = api.packages.getOne.useQuery({ id: id as string });
  if (pkg.isLoading)
    return <div className="flex items-center justify-center">Loading...</div>;

  return (
    <div className="grid grid-cols-3">
      <div className="col-span-2 flex items-center justify-center">
        {pkg.data?.name}
      </div>
      <div className="col-span-1 flex items-center justify-center p-4">
        <MetricsTable pkg={pkg.data} />
      </div>
    </div>
  );
};

export default IndvidualPackage;
