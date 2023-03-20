import Link from "next/link";
import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Button, ButtonVariant } from "../../components/Button/Button";
import { api } from "../../utils/api";
import { signIn } from "next-auth/react";

type TUserRegisterData = {
  username: string;
  email: string;
  password: string;
};

const Register = () => {
  const [userSignInData, setUserSignInData] = useState<TUserRegisterData>({
    username: "",
    email: "",
    password: "",
  });

  const trpcAuth = api.auth.signUp.useMutation();

  const updateFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserSignInData({
      ...userSignInData,
      [e.target.name]: e.target.value,
    });
  };

  const userRegisterFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    trpcAuth.mutate(userSignInData);
  };

  return (
    <>
      <Link className="absolute top-4 left-4" href="/account">
        <IoIosArrowBack size={20} className="cursor-pointer" />
      </Link>
      <div className="flex h-screen w-screen items-center justify-center">
        <form className="w-1/3" onSubmit={userRegisterFormSubmit}>
          <div className="mb-6">
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={updateFormData}
              className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm  placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              placeholder="User123"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={updateFormData}
              className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm  placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              placeholder="user123@gmail.com"
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
              placeholder="********"
              onChange={updateFormData}
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
      </div>
    </>
  );
};

export default Register;
