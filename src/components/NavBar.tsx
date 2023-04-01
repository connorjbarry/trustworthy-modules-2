import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const NavBar = () => {
  const router = useRouter();

  return (
    <div className="sticky z-[100] h-20 w-full" data-testid="nav">
      <div className="flex h-full w-full items-center justify-between px-2 2xl:px-16">
        <Link href="/">
          {/* <Image /> */}
          <span className="text-sm uppercase">
            Trustworthy Modules Registry
          </span>
        </Link>

        <div>
          <ul className="md:flex">
            <Link href="/" data-testid="nav-link">
              <li
                className={`ml-10 text-sm uppercase hover:underline ${
                  router.asPath === "/" ? "text-blue-600" : ""
                }`}
              >
                Home
              </li>
            </Link>
            <Link href="/find-package" data-testid="nav-link">
              <li
                className={`ml-10 text-sm uppercase hover:underline ${
                  router.asPath === "/find-package" ? "text-blue-600" : ""
                }`}
              >
                Packages
              </li>
            </Link>
            <Link href="/about" data-testid="nav-link">
              <li
                className={`ml-10 text-sm uppercase hover:underline ${
                  router.asPath === "/about" ? "text-blue-600" : ""
                }`}
              >
                About
              </li>
            </Link>
            <Link href="/account" data-testid="nav-link">
              <li
                className={`ml-10 text-sm uppercase hover:underline ${
                  router.asPath === "/account" ? "text-blue-600" : ""
                }`}
              >
                Account
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
