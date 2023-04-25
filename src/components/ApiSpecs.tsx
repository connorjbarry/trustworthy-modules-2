import { motion } from "framer-motion";

/*
 * ApiSpecs component for the api documentation
 */
const ApiSpecs = (): JSX.Element => {
  return (
    <motion.div
      initial={{ x: 25 }}
      animate={{ x: 0 }}
      exit={{ x: 25 }}
      transition={{ duration: 0.5 }}
      className="3xl:w-[40vw] mx-4 flex w-[70vw] flex-1 flex-col 2xl:w-[45vw]"
    >
      <h2 className="py-4 text-center text-3xl font-bold">
        Description &#128214;
      </h2>
      <div className="flex flex-col items-start justify-between p-2 lg:flex-row">
        <div className="flex max-w-[33%] flex-col pb-2" id="packages">
          <h3 className="text-xl font-bold">
            <span className="text-[#1589ff]">POST</span> /packages
          </h3>
          <p className="pl-2 text-lg font-bold">Description:</p>
          <p className="pl-4 text-base">
            This endpoint is used to retreive all the package information from
            the database.
          </p>
          <p className="pl-2 text-base font-bold">Request Header:</p>
          <p className="pl-4 text-base">
            X-Authorization - get this token from{" "}
            <a href="#authenticate" className="hover:underline">
              Authenticate
            </a>
          </p>
        </div>
        <div className="flex w-full flex-col lg:w-2/3 lg:pl-4">
          <h3 className="text-xl font-bold">Response</h3>
          <p className="text-base">Response Body:</p>
          <pre className="my-4 rounded-sm bg-slate-800 p-2">
            <code>
              {`
[
  {
    "id": "clgvhcjau0000pzi4xhq6bx11",
    "name": "next",
    "version": "13.1.1",
    "author": "NextJS",
    "githubLink": "https://github.com/vercel/next.js/",
    "rampUp": "7",
    "correctness": "8",
    "licenseCompatability": "7",
    "busFactor": "6",
    "responsiveness": "9",
    "fractionDependencies": "8",
    "fractionReviewed": "9",
    "totalScore": "9",
    "fileURL": null
  },
  {
    "id": "clgvhcjaz0002pzi4pwpyr833",
    "name": "express",
    "version": "4.18.2",
    "author": "ExpressJS",
    "githubLink": "https://github.com/expressjs/express",
    "rampUp": "8",
    "correctness": "9",
    "licenseCompatability": "9",
    "busFactor": "8",
    "responsiveness": "9",
    "fractionDependencies": "7",
    "fractionReviewed": "9",
    "totalScore": "10",
    "fileURL": null
  },
  {
    "id": "clgvhjgb9000ipzi457pqdcsy",
    "name": "tailwindcss",
    "version": "3.3.1",
    "author": "tailwind",
    "githubLink": "https://github.com/tailwindlabs/tailwindcss",
    "rampUp": "8",
    "correctness": "7",
    "licenseCompatability": "9",
    "busFactor": "8",
    "responsiveness": "9",
    "fractionDependencies": "8",
    "fractionReviewed": "9",
    "totalScore": "9",
    "fileURL": null
  }
]
                `}
            </code>
          </pre>
        </div>
      </div>
      <div className="flex flex-col items-start justify-between p-2 lg:flex-row">
        <div className="flex max-w-[33%] flex-col pb-2" id="package">
          <h3 className="text-xl font-bold">
            <span className="text-[#1589ff]">POST</span> /package
          </h3>
          <p className="text-base">Returns a list of all packages</p>
          <p className="pl-2 text-base font-bold">Request Header:</p>
          <p className="pl-4 text-base">
            X-Authorization - get this token from{" "}
            <a href="#authenticate" className="hover:underline">
              Authenticate
            </a>
          </p>
        </div>
        <div className="flex w-full flex-col lg:w-2/3 lg:pl-4">
          <h3 className="text-xl font-bold">Response</h3>
          <p className="text-base">Response Body:</p>
          <pre className="my-4 rounded-sm bg-slate-800 p-2">
            <code>
              {`
{
    - Version: 1.2.3
    Name: Underscore
    ID: underscore
},
{
    Version: 1.2.3-2.1.0
    Name: Lodash
    ID: lodash
},
{
    Version: ^1.2.3
    Name: React
    ID: react
}
                `}
            </code>
          </pre>
        </div>
      </div>
      <div className="flex flex-col items-start justify-between p-2 lg:flex-row">
        <div className="flex max-w-[33%] flex-col pb-2" id="package-id">
          <h3 className="text-xl font-bold">
            <span className="text-[#39ff14]">GET</span> /package/{`{id}`}
          </h3>
          <p className="text-base">
            Return the rating. Only use this if each metric was computed
            successfully.
          </p>
          <p className="pl-2 text-base font-bold">Request Header:</p>
          <p className="pl-4 text-base">
            X-Authorization - get this token from{" "}
            <a href="#authenticate" className="hover:underline">
              Authenticate
            </a>
          </p>
          <p className="pl-2 text-base font-bold">Request Path:</p>
          <p className="pl-4 text-base">
            id - the id of the package to get the rating for
          </p>
        </div>
        <div className="flex w-full flex-col lg:w-2/3 lg:pl-4">
          <h3 className="text-xl font-bold">Response</h3>
          <p className="text-base">Response Body:</p>
          <pre className="my-4 rounded-sm bg-slate-800 p-2">
            <code>
              {`
[
  {
    "id": "clgvhcjau0000pzi4xhq6bx11",
    "name": "next",
    "version": "13.1.1",
    "author": "NextJS",
    "githubLink": "https://github.com/vercel/next.js/",
    "rampUp": "7",
    "correctness": "8",
    "licenseCompatability": "7",
    "busFactor": "6",
    "responsiveness": "9",
    "fractionDependencies": "8",
    "fractionReviewed": "9",
    "totalScore": "9",
    "fileURL": null
  },
  {
    "id": "clgvhcjaz0002pzi4pwpyr833",
    "name": "express",
    "version": "4.18.2",
    "author": "ExpressJS",
    "githubLink": "https://github.com/expressjs/express",
    "rampUp": "8",
    "correctness": "9",
    "licenseCompatability": "9",
    "busFactor": "8",
    "responsiveness": "9",
    "fractionDependencies": "7",
    "fractionReviewed": "9",
    "totalScore": "10",
    "fileURL": null
  },
  {
    "id": "clgvhjgb9000ipzi457pqdcsy",
    "name": "tailwindcss",
    "version": "3.3.1",
    "author": "tailwind",
    "githubLink": "https://github.com/tailwindlabs/tailwindcss",
    "rampUp": "8",
    "correctness": "7",
    "licenseCompatability": "9",
    "busFactor": "8",
    "responsiveness": "9",
    "fractionDependencies": "8",
    "fractionReviewed": "9",
    "totalScore": "9",
    "fileURL": null
  }
]
                `}
            </code>
          </pre>
        </div>
      </div>
      <div className="flex flex-col items-start justify-between p-2 lg:flex-row">
        <div className="flex max-w-[33%] flex-col pb-2" id="package-id-put">
          <h3 className="text-xl font-bold">
            <span className="text-[#ffff33]">PUT</span> /package/{`{id}`}
          </h3>
          <p className="text-base">Updates a package with the given id</p>
          <p className="text-base">Request Body:</p>
          <pre className="my-4 rounded-sm bg-slate-800 p-2">
            <code>
              {`
{
  "id": "clgvhcjau0000pzi4xhq6bx11",
  "name": "next",
  "version": "13.1.1",
  "author": "NextJS",
  "githubLink": "",
  "rampUp": "7",
  "correctness": "8",
  "licenseCompatability": "7",
  "busFactor": "6",
  "responsiveness": "9",
  "fractionDependencies": "8",
  "fractionReviewed": "9",
  "totalScore": "9",
  "fileURL": null
}
                `}
            </code>
          </pre>
          <p className="pl-2 text-base font-bold">Request Header:</p>
          <p className="pl-4 text-base">
            X-Authorization - get this token from{" "}
            <a href="#authenticate" className="hover:underline">
              Authenticate
            </a>
          </p>
          <p className="pl-2 text-base font-bold">Request Path:</p>
          <p className="pl-4 text-base">
            id - the id of the package to get the rating for
          </p>
        </div>
        <div className="flex w-full flex-col lg:w-2/3 lg:pl-4">
          <h3 className="text-xl font-bold">Response</h3>
          <p className="text-base">Response Body:</p>
          <pre className="my-4 rounded-sm bg-slate-800 p-2">
            <code>
              {`
{
  "message": "Version is updated."
}
                `}
            </code>
          </pre>
        </div>
      </div>
      <div className="flex flex-col items-start justify-between p-2 lg:flex-row">
        <div className="flex max-w-[33%] flex-col pb-2" id="package-id-delete">
          <h3 className="text-xl font-bold">
            <span className="text-[#ff3131]">DELETE</span> /package/{`{id}`}
          </h3>
          <p className="text-base">Deletes a package with the given id</p>
          <p className="pl-2 text-base font-bold">Request Header:</p>
          <p className="pl-4 text-base">
            X-Authorization - get this token from{" "}
            <a href="#authenticate" className="hover:underline">
              Authenticate
            </a>
          </p>
          <p className="pl-2 text-base font-bold">Request Path:</p>
          <p className="pl-4 text-base">
            id - the id of the package to get the rating for
          </p>
        </div>
        <div className="flex w-full flex-col lg:w-2/3 lg:pl-4">
          <h3 className="text-xl font-bold">Response</h3>
          <p className="text-base">200 OK</p>
          <p className="text-base">Returns a list of all packages</p>
          <p className="text-base">Response Body:</p>
          <pre className="my-4 rounded-sm bg-slate-800 p-2">
            <code>
              {`
{
  "message": "Package is deleted."
}
                `}
            </code>
          </pre>
        </div>
      </div>
      <div className="flex flex-col items-start justify-between p-2 lg:flex-row">
        <div className="flex max-w-[33%] flex-col pb-2" id="package-id-rate">
          <h3 className="text-xl font-bold">
            <span className="text-[#39ff14]">GET</span> /package/{`{id}`}/rate
          </h3>
          <p className="text-base">
            Returns the rating of a package with the given id
          </p>
          <p className="text-base">Request Body:</p>
          <p className="text-base">None</p>
        </div>
        <div className="flex w-full flex-col lg:w-2/3 lg:pl-4">
          <h3 className="text-xl font-bold">Response</h3>
          <p className="text-base">200 OK</p>
          <p className="text-base">Returns a list of all packages</p>
          <p className="text-base">Response Body:</p>
          <pre className="my-4 rounded-sm bg-slate-800 p-2">
            <code>
              {`
{
  "rating": "10"
}
                `}
            </code>
          </pre>
        </div>
      </div>
      <div className="flex flex-col items-start justify-between p-2 lg:flex-row">
        <div className="flex max-w-[33%] flex-col pb-2" id="package-byName">
          <h3 className="text-xl font-bold">
            <span className="text-[#39ff14]">GET</span> /package/byName/
            {`{name}`}
          </h3>
          <p className="text-base">Returns a package with the given name</p>
          <p className="text-base">Request Header:</p>
          <p className="text-base">X-Authorization</p>
          <p className="text-base">bearer {`<token>`}</p>
        </div>
        <div className="flex w-full flex-col lg:w-2/3 lg:pl-4">
          <h3 className="text-xl font-bold">Response</h3>
          <p className="text-base">200 OK</p>
          <p className="text-base">Returns a list of all packages</p>
          <p className="text-base">Response Body:</p>
          <pre className="my-4 rounded-sm bg-slate-800 p-2">
            <code>
              {`
[
  {
    "User": {
      "Username": "seano",
      "isAdmin": true
    },
    "Date": "2023-04-25T14:44:51.565Z",
    "PackageMetadata": {
      "Name": "next",
      "Version": null,
      "ID": "clgvhcjau0000pzi4xhq6bx11"
    },
    "Action": "RATE"
  },
  {
    "User": {
      "Username": "seano",
      "isAdmin": true
    },
    "Date": "2023-04-25T14:41:59.131Z",
    "PackageMetadata": {
      "Name": "next",
      "Version": null,
      "ID": "clgvhcjau0000pzi4xhq6bx11"
    },
    "Action": "UPDATE"
  },
  {
    "User": {
      "Username": "seano",
      "isAdmin": true
    },
    "Date": "2023-04-25T14:41:08.219Z",
    "PackageMetadata": {
      "Name": "next",
      "Version": null,
      "ID": "clgvhcjau0000pzi4xhq6bx11"
    },
    "Action": "DOWNLOAD"
  },
  {
    "User": {
      "Username": "seano",
      "isAdmin": true
    },
    "Date": "2023-04-25T14:40:52.621Z",
    "PackageMetadata": {
      "Name": "next",
      "Version": null,
      "ID": "clgvhcjau0000pzi4xhq6bx11"
    },
    "Action": "CREATE"
  }
]
                `}
            </code>
          </pre>
        </div>
      </div>
      <div className="flex flex-col items-start justify-between p-2 lg:flex-row">
        <div className="flex max-w-[33%] flex-col pb-2">
          <h3 className="text-xl font-bold">
            <span className="text-[#ff3131]">DELETE</span> /package/byName/
            {`{name}`}
          </h3>
          <p className="text-base">Deletes a package with the given name</p>
          <p className="pl-2 text-base font-bold">Request Header:</p>
          <p className="pl-4 text-base">
            X-Authorization - get this token from{" "}
            <a href="#authenticate" className="hover:underline">
              Authenticate
            </a>
          </p>
        </div>
        <div className="flex w-full flex-col lg:w-2/3 lg:pl-4">
          <h3 className="text-xl font-bold">Response</h3>
          <p className="text-base">200 OK</p>
          <p className="text-base">Returns a list of all packages</p>
          <p className="text-base">Response Body:</p>
          <pre className="my-4 rounded-sm bg-slate-800 p-2">
            <code>
              {`
{
  description: "Package is deleted",
}
                `}
            </code>
          </pre>
        </div>
      </div>
      <div className="flex flex-col items-start justify-between p-2 lg:flex-row">
        <div className="flex max-w-[33%] flex-col pb-2" id="package-byRegEx">
          <h3 className="text-xl font-bold">
            <span className="text-[#1589ff]">POST</span> /package/byRegEx/
            {`{regex}`}
          </h3>
          <p className="text-base">
            Find all packages that match the given regex
          </p>
          <p className="text-base">Request Body:</p>
          <pre className="my-4 rounded-sm bg-slate-800 p-2">
            <code>
              {`
{
  "Regex": <regex>
}
                `}
            </code>
          </pre>
          
        </div>
        <div className="flex w-full flex-col lg:w-2/3 lg:pl-4">
          <h3 className="text-xl font-bold">Response</h3>
          <p className="text-base">Returns a list of all packages that matched the regex pattern</p>
          <p className="text-base">Response Body:</p>
          <pre className="my-4 rounded-sm bg-slate-800 p-2">
            <code>
              {`
{
  "Version": "1.2.3",
  "Name": "Underscore"
},
{
  "Version": "1.2.3-2.1.0",
  "Name": "Lodash"
},
{
  "Version": "^1.2.3",
  "Name": "React"
}
                `}
            </code>
          </pre>
        </div>
      </div>
      <div className="flex flex-col items-start justify-between p-2 lg:flex-row">
        <div className="flex max-w-[33%] flex-col pb-2" id="authenticate">
          <h3 className="text-xl font-bold">
            <span className="text-[#1589ff]">POST</span> /authenticate
          </h3>
          <p className="text-base">Returns a JWT token</p>
          <p className="text-base">Request Body:</p>
          <pre className="my-4 rounded-sm bg-slate-800 p-2">
            <code>
              {`
{
  "User": {
    "name": <username>,
    "isAdmin": true
  },
  "Secret": {
    "password": <password>
  }
}
                `}
            </code>
          </pre>
        </div>
        <div className="flex w-full flex-col lg:w-2/3 lg:pl-4">
          <h3 className="text-xl font-bold">Response</h3>
          <p className="text-base">200 OK</p>
          <p className="text-base">Returns a list of all packages</p>
          <p className="text-base">Response Body:</p>
          <pre className="my-4 rounded-sm bg-slate-800 p-2">
            <code>
              {`
{
  token: "bearer <token>"
}
                `}
            </code>
          </pre>
        </div>
      </div>
      <div className="flex flex-col items-start justify-between p-2 lg:flex-row">
        <div className="flex max-w-[33%] flex-col pb-2" id="reset">
          <h3 className="text-xl font-bold">
            <span className="text-[#ff3131]">DELETE</span> /reset
          </h3>
          <p className="text-base">Deletes all packages</p>
          <p className="text-base">Request Body:</p>
          <p className="text-base">None</p>
        </div>
        <div className="flex w-full flex-col lg:w-2/3 lg:pl-4">
          <h3 className="text-xl font-bold">Response</h3>
          <p className="text-base">200 OK</p>
          <p className="text-base">Returns a list of all packages</p>
          <p className="text-base">Response Body:</p>
          <pre className="my-4 rounded-sm bg-slate-800 p-2">
            <code>
              {`
{
    - Version: 1.2.3
    Name: Underscore
    ID: underscore
},
{
    Version: 1.2.3-2.1.0
    Name: Lodash
    ID: lodash
},
{
    Version: ^1.2.3
    Name: React
    ID: react
}
                `}
            </code>
          </pre>
        </div>
      </div>
    </motion.div>
  );
};

export default ApiSpecs;
