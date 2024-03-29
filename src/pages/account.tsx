import { signIn, signOut, useSession } from "next-auth/react";
import { Button, ButtonVariant } from "../components/Button/Button";
import { api } from "../utils/api";
import UserList from "../components/UserList";
import Head from "next/head";

const Account = () => {
  const { data: session, status } = useSession();
  const isAuthed = status === "authenticated";
  const currentUser = api.user.getCurrentUser.useQuery({
      email: session?.user?.email,
  });

  return (
    <>
      <Head>
        <title>Account</title>
        <meta name="description" content="Account page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-top">
      {isAuthed ? (
          <>
            <div className="flex flex-row justify-around items-center w-screen">
              <div className="flex flex-col justify-center items-right">
                <p className="text-base font-bold">{currentUser?.data?.role}</p> 
                <p className="text-sm text-gray-300">{currentUser?.data?.email}</p> 
              </div>
              <div className="text-6xl font-bold">
                {/* if no name for the user then we use username instead. */}
                {currentUser?.data?.name ? currentUser?.data?.name : currentUser?.data?.username}
              </div>
              <Button
                variant={ButtonVariant.Primary}
                onClick={() => {
                  isAuthed ? void signOut() : void signIn();
                }}
              >
                {isAuthed ? "Sign out" : "Sign in"}
              </Button>
            </div>
            {
              currentUser?.data?.role === "ADMIN" ? <UserList /> : null
            }
          </>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <div className="text-5xl font-bold p-2">Account</div>
            <span className="text-2xl pt-4 my-4">Please Sign In to Continue</span>
            <Button
              variant={ButtonVariant.Primary}
              onClick={() => {
                isAuthed ? void signOut() : void signIn();
              }}
              className="my-8"
            >
              {isAuthed ? "Sign out" : "Sign in"}
            </Button>
          </div>
        )}
    </div>
    </>
  );
};

export default Account;
