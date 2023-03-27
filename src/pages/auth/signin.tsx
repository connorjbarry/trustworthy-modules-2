/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState, type ReactNode } from "react";
import {
  type ClientSafeProvider,
  getProviders,
  type LiteralUnion,
  signIn,
} from "next-auth/react";
import { BsGoogle, BsGithub } from "react-icons/bs";
import { FaDiscord } from "react-icons/fa";
import { type BuiltInProviderType } from "next-auth/providers";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import { Button, ButtonVariant } from "~/components/Button/Button";

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
  const [signInCredentials, setSignInCredentials] = useState({
    credential: "",
    password: "",
  });

  if (!providers) return null;

  const providerList = Object.values(
    providers.providers as unknown as string[]
  ).map((provider: any, index: number) => {
    if (provider.id === "credentials") return;
    return (
      <div
        key={provider.id}
        id={provider.name}
        className="flex w-full flex-row items-center justify-center py-4 text-lg sm:text-xl 2xl:text-2xl"
      >
        <button
          onClick={() =>
            void signIn(provider.id, {
              callbackUrl: `${
                process.env.NEXTAUTH_URL ?? window.location.origin
              }`,
            })
          }
          className={`flex w-2/3 flex-row items-center justify-evenly rounded-2xl transition duration-150 hover:shadow-lg hover:shadow-slate-500/50 ${
            providerStyles[index]?.bgcolor as string
          } ${providerStyles[index]?.iconcolor as string}`}
        >
          <span className="p-1 sm:p-2 lg:p-4">
            {providerStyles[index]?.icon}
          </span>
          <span className="overflow-clip py-1 pr-1 text-sm sm:py-2 sm:pr-2 lg:py-4 lg:pr-4">
            Sign in with {provider.name}
          </span>
        </button>
      </div>
    );
  });

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignInCredentials({
      ...signInCredentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Link className="absolute top-4 left-4" href="/account">
        <IoIosArrowBack size={20} className="cursor-pointer" />
      </Link>
      <div className="flex h-screen w-screen flex-col items-center justify-center">
        <div className="flex w-1/2 flex-col items-center justify-center rounded-lg p-4 text-center sm:w-1/3 2xl:w-1/5">
          {providerList}
          <hr className="my-8 block w-full border-t-4 border-solid" />
          <form
            className="w-2/3"
            onSubmit={(e) => {
              e.preventDefault();
              void signIn("credentials", {
                callbackUrl: `${
                  process.env.NEXTAUTH_URL ?? window.location.origin
                }`,
                redirect: true,
                credentials: signInCredentials.credential,
                password: signInCredentials.password,
              });
            }}
          >
            <div className="mb-6">
              <label
                htmlFor="email/user"
                className="mb-2 block text-sm font-medium"
              >
                Email / Username
              </label>
              <input
                type="text"
                id="email/user"
                name="credential"
                onChange={onInputChange}
                className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm  placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                placeholder="name@mail.com"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={onInputChange}
                placeholder="********"
                className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm  placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <Button
              variant={ButtonVariant.Primary}
              className="mb-2 w-full"
              type="submit"
            >
              Sign In
            </Button>
          </form>
          <div>
            Don&apos;t have an account? Register{" "}
            <Link
              href="/auth/register"
              className="text-blue-600 hover:text-blue-700"
            >
              here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
