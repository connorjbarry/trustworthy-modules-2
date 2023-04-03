import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../server/db';
import type { IndivPkg } from '@prisma/client';
// import authMiddleware from '../../../../middleware/authMiddleware';

/*
* Name handler for the /package/byName/[name] API endpoint.
* this endpoint returns an array of actions for the given package name with the following format:
* {
*  User: {
*    Username: <username>,
*    isAdmin: <isAdmin>,    
*  },
* Date: <date>,
* PackageMetadata: {
*   Name: <name>,
*   Version: <version>,
*   ID: <id>,
* },
* Action: <action>,
* }
*/
const nameHandler = (req: NextApiRequest, res: NextApiResponse) => {
    const { name } = req.query;
    const nameStr = name as string;

    // if there is missing field(s) or missing authentification, return 404
    if (!nameStr) {
        res.status(400).json({ error: 'There is missing field(s) in the PackageName/AuthenticationToken or it is formed improperly.' });
        return;
    }

    // search for the exact package that matches the name
    prisma.indivPkg.findUnique({
        where: {
            name: nameStr   
        }
    }).then((indivPkg: IndivPkg | null) => {
        // if no package matches the name, return an empty array and 404
        if (!indivPkg) {
            res.status(404).json({ error: 'No package matches the name.' });
            return;
        }

        // search for all actions that matches the package id
        prisma.action.findMany({
            where: {
                indivPkgId: indivPkg.id
            },
        }).then((actions) => {
            // if no actions matches the package id, return an empty array and 404
            if (!actions) {
                res.status(404).json({ error: 'No actions matches the package id.' });
                return;
            }

            // reverse the actions array so that the most recent action is first
            actions.reverse();

            // map the actions to the desired format
            const res_json = actions.map((action) => {
                // search for the user that matches the action's user id for the isAdmin field
                const isAdmin = prisma.user.findUnique({
                    where: {
                        username: action.username
                    }
                }).then((user) => {
                    if (!user) {
                        res.status(404).json({ error: 'No user matches the username.' });
                        return;
                    }
                    return user.role === "ADMIN";
                }).catch((err: Error) => {
                    res.status(500).json(err);
                });


                return {
                    User: {
                        Username: action.username,
                        isAdmin: isAdmin,
                    },
                    Date: action.date,
                    PackageMetadata: {
                        Name: indivPkg.name,
                        Version: indivPkg.version,
                        ID: indivPkg.id,
                    },
                    Action: action.action,
                };
            });
            res.status(200).json(res_json);
        }).catch((err: Error) => {
            res.status(500).json(err);
        });
    }).catch((err: Error) => {
        res.status(500).json(err);
    });
};

// export default authMiddleware(nameHandler); for authenticate user
export default nameHandler;