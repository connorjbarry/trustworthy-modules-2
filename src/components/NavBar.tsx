import React from "react";
import Link from "next/link";

const NavBar = () => {
  return (
    <div className="fixed z-[100] h-20 w-full" data-testid="nav">
      <div className="flex h-full w-full items-center justify-between px-2 2xl:px-16">
        <Link href="/">Image</Link>

        <div>
          <ul className="md:flex">
            <Link href="/">
              <li className="ml-10 text-sm uppercase hover:border-b">Home</li>
            </Link>
            <Link href="/">
              <li className="ml-10 text-sm uppercase hover:border-b">
                Packages
              </li>
            </Link>
            <Link href="/">
              <li className="ml-10 text-sm uppercase hover:border-b">About</li>
            </Link>
            <Link href="/account">
              <li className="ml-10 text-sm uppercase hover:border-b">
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
