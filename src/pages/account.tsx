import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import { Button, ButtonVariant } from "../components/Button/Button";
import { api } from "../utils/api";

const Account = () => {
  const { data: session, status } = useSession();
  const isAuthed = status === "authenticated";
  let currentUser;
  if (isAuthed) {
    currentUser = api.user.getCurrentUser.useQuery({
      email: session?.user?.email,
    });
  }

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <p>Account</p>
      {isAuthed ? (
        <div>
          <p>Logged in as {currentUser?.data?.name}</p>
          <p>{currentUser?.data?.email}</p>
          <p>{currentUser?.data?.role}</p>
        </div>
      ) : (
        <p>Not signed in</p>
      )}
      <Button
        variant={ButtonVariant.Primary}
        onClick={() => {
          isAuthed ? void signOut() : void signIn();
        }}
      >
        {isAuthed ? "Sign out" : "Sign in"}
      </Button>
    </div>
  );
};

export default Account;
