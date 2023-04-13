import React from "react";
import Head from "next/head";

/*
 * Doc page
 * This will be the documentation page of the
 * usage of the app and our api.
 */
const Doc = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Documentation</title>
        <meta
          name="description"
          content="Documentation for the usage of our app and api"
        />
        <meta name="keywords" content="documentation, api, usage, app" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-8xl">Documentation</h1>
        <p className="text-5xl">
          Documentation for the usage of our app and api
        </p>
        <div className="flex flex-row">
          <div className="flex flex-col">
            <h2>API</h2>
            <div className="px-2">
              <h3>download</h3>
              <h3>upload</h3>
              <h3>update</h3>
              <h3>rate</h3>
              <h3>search</h3>
              <h3>fetch</h3>
              <div className="px-2">
                <h4>history</h4>
                <h4>directory</h4>
              </div>
            </div>
            <h2>APP</h2>
          </div>
          <div className="flex flex-col">
            <div>
              <h2>API</h2>
              <div className="px-2">
                <h3>download</h3>
                <div className="px-2">
                  <p>
                    <code>GET</code> <code>/api/download</code>
                  </p>
                  <p>
                    This will download the file from the github repo. The file
                    will be zipped.
                  </p>
                </div>
                <h3>upload</h3>
                <div className="px-2">
                  <p>
                    <code>POST</code> <code>/api/upload</code>
                  </p>
                </div>
                <h3>update</h3>
                <h3>rate</h3>
                <div className="px-2">
                  <p>
                    <code>GET</code> <code>/api/rate</code>
                  </p>
                </div>
                <h3>search</h3>
                <div className="px-2">
                  <p>
                    <code>GET</code> <code>/api/search</code>
                  </p>
                </div>
                <h3>fetch</h3>
                <div className="px-2">
                  <h4>history</h4>
                  <div className="px-2">
                    <p>
                      <code>GET</code> <code>/api/fetch/history/[date]</code>
                    </p>
                  </div>
                  <h4>directory</h4>
                  <div className="px-2">
                    <p>
                      <code>GET</code> <code>/api/fetch/directory</code>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Doc;
