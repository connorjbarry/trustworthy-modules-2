import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
// import { signIn, signOut, useSession } from "next-auth/react";

// import { api } from "~/utils/api";

// TODO: add footer w names, proj desc,

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Trustworthy Module</title>
        <meta name="description" content="An NPM like package registry with graded packages" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mt-28 flex">
        <div className="mx-auto max-w-7xl">
          <div className=" z-10 flex w-full max-w-2xl flex-wrap pb-28">
            <div className=" px-4 pt-6 sm:px-6 lg:px-8"></div>

            <main className="mx-auto mt-20 max-w-7xl px-8">
              <div className="flex flex-col items-center text-left">
                <h1 className=" flex flex-col items-center text-6xl font-bold tracking-tight">
                  <div className="block">ECE 461</div>
                  <div className="block text-blue-600">Trustworthy Modules</div>
                </h1>
                <p className="mt-3 text-xl text-white lg:mx-0">
                  An NPM like package registry with graded packages
                </p>
                <div className="mt-5 flex justify-start gap-4">
                  <div className="rounded-md shadow">
                    <Link
                      href="/account"
                      className="flex w-full items-center justify-center rounded-md bg-blue-600 px-8 py-3 text-base font-medium hover:bg-blue-700"
                    >
                      Get Started
                    </Link>
                  </div>
                  <div className="rounded-md shadow">
                    <Link
                      href="/find-package"
                      className="flex w-full items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-base font-medium hover:bg-blue-700"
                    >
                      Find Packages
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
