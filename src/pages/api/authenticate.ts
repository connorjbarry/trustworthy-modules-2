import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db";
import { getSession } from "next-auth/react";
import sha256 from "crypto-js/sha256";
import Base64 from "crypto-js/enc-base64";

/*
 * Authentication handler for the /authenticate API endpoint.
 * this endpoint returns a token that can be used to authenticate the user with the following format:
 * {
 *   token: "bearer <token>"
 * }
 */

const authHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (session?.user) {
    // Signed in
    if (session.user.email) {
      const user = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
      });
      if (user && user.role === "ADMIN") {
        // if the user apiKey is not set, set it to a random string
        if (!user.apiKey) {
          const apiKey = Base64.stringify(sha256(session.user.email));
          await prisma.user.update({
            where: {
              email: session.user.email,
            },
            data: {
              apiKey: apiKey,
            },
          });
        }

        // return the user and the apiKey with the given format
        res.status(200).json({
          token: `bearer ${user.apiKey}`,
        });
      } else {
        res.status(400).json({
          error:
            "There is missing field(s) in the PackageRegEx/AuthenticationToken or it is formed improperly.",
        });
      }
    } else {
      res.status(400).json({
        error:
          "There is missing field(s) in the PackageRegEx/AuthenticationToken or it is formed improperly.",
      });
    }
  } else {
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
    const authenticationRequest = req.body;
    
    // with the username find the user in the database
    const user = await prisma.user.findUnique({
      where: {
        username: authenticationRequest.User.name,
      },
    });

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
        const apiKey = Base64.stringify(sha256(user.email as string));
        await prisma.user.update({
          where: {
            email: user.email as string,
          },
          data: {
            apiKey: apiKey,
          },
        });
      }
    }

    res.status(200).json({
      token: `bearer ${user.apiKey}`,
    });
  }
};

export default authHandler;
