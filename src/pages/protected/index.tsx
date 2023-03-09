import React from 'react';
import { useSession } from 'next-auth/react';
import Head from "next/head";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

const ProtectedPage = (): JSX.Element => {
    const router = useRouter();
    const { data: session, status } = useSession({
      required: true,
      onUnauthenticated() {
        // The user is not authenticated, handle it here.
        router.push("/");
      },
    });

    const user = session?.user?.name;

    return (
        <>
            <Head>
                <title>Protected Page</title>
                <meta name="description" content="Trustwothy modules team 9 ece461" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-8xl">Welcome!</h1>
                <h2 className="text-6xl">{user}</h2>
                <p className="text-5xl">Trustworthy modules team 9 ece 461</p>
                <button onClick={() => signOut()} className="bg-slate rounded-md">Sign out</button>
            </main>
        </>
    )
}

export default ProtectedPage;
