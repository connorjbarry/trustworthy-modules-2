/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { type ReactNode } from "react";
import {
  type ClientSafeProvider,
  getProviders,
  type LiteralUnion,
  signIn,
} from "next-auth/react";
import { BsGoogle, BsGithub } from "react-icons/bs";
import { FaDiscord } from "react-icons/fa";
import { type BuiltInProviderType } from "next-auth/providers";
interface ProviderStylesType {
  bgcolor: string;
  iconcolor: string;
  icon: ReactNode;
}

const providerStyles: ProviderStylesType[] = [
  {
    bgcolor: "bg-[#7289DA]",
    iconcolor: "text-gray-100",
    icon: <FaDiscord />,
  },
  {
    bgcolor: "bg-gray-800",
    iconcolor: "text-gray-100",
    icon: <BsGithub />,
  },
  {
    bgcolor: "bg-gray-100",
    iconcolor: "text-gray-800",
    icon: <BsGoogle />,
  },
];

export default function SignIn(
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null
) {
  if (!providers) return null;
  const providerList = Object.values(
    providers.providers as unknown as string[]
  ).map((provider: any, index: number) => {
    return (
      <div
        key={provider.id}
        id={provider.name}
        className="flex w-full flex-row items-center justify-center py-4 text-lg sm:text-xl 2xl:text-2xl"
      >
        <button
          onClick={() =>
            void signIn(provider.id, {
              callbackUrl: `${window.location.origin}/protected`,
            })
          }
          className={`flex w-2/3 flex-row items-center justify-evenly rounded-2xl transition duration-150 hover:shadow-lg hover:shadow-slate-500/50 ${
            providerStyles[index]?.bgcolor as string
          } ${providerStyles[index]?.iconcolor as string}`}
        >
          <span className="p-1 sm:p-2 lg:p-4">
            {providerStyles[index]?.icon}
          </span>
          <span className="overflow-clip py-1 pr-1 sm:py-2 sm:pr-2 lg:py-4 lg:pr-4">
            {provider.name}
          </span>
        </button>
      </div>
    );
  });

  return (
    <div className="flex h-screen w-screen flex-row items-center justify-center bg-slate-900">
      <div className="flex w-1/2 flex-col items-center justify-center rounded-lg bg-slate-200 text-center sm:w-1/3 2xl:w-1/5">
        {providerList}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
