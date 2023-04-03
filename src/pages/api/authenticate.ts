import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../server/db';
import { getSession } from 'next-auth/react';
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';

/*
* Authentication handler for the /authenticate API endpoint.
* this endpoint returns a token that can be used to authenticate the user with the following format:
* {
*   User: {
*     name: <username>,
*     isAdmin: <isAdmin>,
*   },
*    Secret: {
*        password: <password>,
*    }
* }
*/

const authHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });

    console.log(session)
        
    if (session) {
        // Signed in
        if(session.user.id){
            const user = await prisma.user.findUnique({
                where: {
                    id: session.user.id
                },
            });
            if(user && user.role === "ADMIN"){
                // if the user apiKey is not set, set it to a random string
                if(!user.apiKey){
                    const apiKey = Base64.stringify(sha256(Math.random().toString()));
                    await prisma.user.update({
                        where: {
                            id: session.user.id
                        },
                        data: {
                            apiKey: apiKey
                        }
                    });
                } 

                // return the user and the apiKey with the given format
                res.status(200).json({
                    User: {
                        name: user.name,
                        isAdmin: user.role === "ADMIN",
                    },
                    Secret: {
                        password: user.apiKey,
                    }
                });
            } else {
                res.status(400).json({ error: 'There is missing field(s) in the PackageRegEx/AuthenticationToken or it is formed improperly.' });
            }
        } else {
            res.status(400).json({ error: 'There is missing field(s) in the PackageRegEx/AuthenticationToken or it is formed improperly.' });
        }
    } else {
        // Not Signed in
        res.status(401).json({ error: 'Not authenticated.' });
    }
}

export default authHandler;