import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../server/db';

/*
* This file contains the middleware for the API endpoints.
* The middleware is used to authenticate the user before the endpoint is called.
*/

const authMiddleware = (handler: (req: NextApiRequest, res: NextApiResponse) => void) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        let token = req.headers['x-authorization'] as string;
        if(!token){
            token = req.headers.authorization as string;
            // remove the "Bearer " part from the token
            token = token.substring(7);
        }

        // search for the user with the given apiKey
        const user = await prisma.user.findUnique({
            where: {
                apiKey: token
            },
        });

        // if the user is not found, return 401
        if (!user) {
            res.status(401).json({ error: 'The AuthenticationToken is invalid.' });
            return;
        }

        // if the user is found, call the handler
        handler(req, res);
    };
}

export default authMiddleware;