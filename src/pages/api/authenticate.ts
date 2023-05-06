/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db";
// import { getSession } from "next-auth/react";
import sha256 from "crypto-js/sha256";
import Base64 from "crypto-js/enc-base64";
import type { User } from "@prisma/client";

type AuthenticationRequest = {
  User: {
    name: string;
    isAdmin: boolean;
  };
  Secret: {
    password: string;
  };
};

/*
 * Authentication handler for the /authenticate API endpoint.
 * this endpoint returns a token that can be used to authenticate the user with the api key
 */

const authHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const username = (req.body.User.name ?? "") as string;

  if (req.method === "PUT") {
    /* if not signed in, see if the user provided username and password
     * the body should contain the following fields:
     *  const authenticationRequest = {
     *    "User": {
     *      "name": <username>,
     *      "isAdmin": true
     *    },
     *    "Secret": {
     *      "password": <password>
     *    }
     *  };
     */
    // get the body of the request
    const authenticationRequest = req.body as AuthenticationRequest;

    if (!authenticationRequest) {
      res.status(401).json({ error: "No username or password provided." });
      return;
    }

    // if no username or password is provided, return 404
    if (
      !authenticationRequest.User.name ||
      !authenticationRequest.Secret.password
    ) {
      res.status(401).json({ error: "No username or password provided." });
      return;
    }

    // with the username find the user in the database
    const user = await prisma.user.findUnique({
      where: {
        username: authenticationRequest.User.name,
      },
    });

    let apiKey = null;

    // if the user is not found, return 404
    if (!user) {
      res.status(401).json({ error: "No user matches the username." });
      return;
    } else {
      // if the password is not correct, return 404
      if (user.password !== authenticationRequest.Secret.password) {
        res.status(401).json({ error: "Incorrect password." });
        return;
      }

      // if the user apiKey is not set, set it to a random string
      if (!user.apiKey) {
        apiKey = Base64.stringify(sha256(user.email as string));
        await prisma.user.update({
          where: {
            username: username,
          },
          data: {
            apiKey: apiKey,
          },
        });
      } else {
        apiKey = user.apiKey;
      }
    }

    res.status(200).json(`bearer ${apiKey}`);
  } else {
    res.status(401).json({ error: "Unauthorized or wrong method." });
  }
};

export default authHandler;
