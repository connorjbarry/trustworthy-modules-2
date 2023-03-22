import { useRouter } from "next/router";
import React from "react";
import { api } from "~/utils/api";

const IndvidualPackage = () => {
  const router = useRouter();
  const { id } = router.query;
  const pkg = api.packages.getOne.useQuery({ id: id as string });

  return <div>{pkg.data?.name}</div>;
};

export default IndvidualPackage;
