import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../server/db";

/*
 * This file contains the middleware for the API endpoints.
 * The middleware is used to authenticate the user before the endpoint is called.
 */

const authMiddleware = (
  handler: (req: NextApiRequest, res: NextApiResponse) => void
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    let authToken = req.headers["x-authorization"] as string;
    // if auth token has quotes around it, remove them
    if (
      authToken &&
      authToken[0] == '"' &&
      authToken[authToken.length - 1] == '"'
    ) {
      authToken = authToken.substring(1, authToken.length - 1);
    }
    if (authToken && authToken.split(" ")[0]?.toLowerCase() == "bearer") {
      authToken = authToken.split(" ")[1] as string;
    }

    let bearerToken = null;
    if (!authToken) {
      bearerToken = req.headers.authorization as string;
      // remove the "Bearer " part from the token
    }

    if (!bearerToken && !authToken) {
      res.status(400).json({ error: "The AuthenticationToken is missing." });
      return;
    }

    const token = authToken
      ? authToken
      : bearerToken
      ? bearerToken.split(" ")[1]
      : "";

    // search for the user with the given apiKey
    const user = await prisma.user.findUnique({
      where: {
        apiKey: token,
      },
    });

    // if the user is not found, return 401
    if (!user) {
      res.status(400).json({ error: "The AuthenticationToken is invalid." });
      return;
    }

    // if the user is found, call the handler
    handler(req, res);
  };
};

export default authMiddleware;
