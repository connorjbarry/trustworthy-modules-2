import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../server/db';
import authMiddleware from '../../../../middleware/authMiddleware';

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

    // json response for the GET request
    if(req.method === 'GET') {
        (async () => {
            // search for the exact package that matches the name
            const indivPkg = await prisma.indivPkg.findUnique({
                where: {
                    name: nameStr
                }
            });

            // if no package matches the name, return an empty array and 404
            if (!indivPkg) {
                res.status(404).json({ error: 'No package matches the name.' });
                return;
            }

            // search for all actions that matches the package id
            const actions = await prisma.action.findMany({
                where: {
                    indivPkgId: indivPkg.id
                },
            });

            // if no actions matches the package id, return an empty array and 404
            if (!actions) {
                res.status(404).json({ error: 'No actions matches the package id.' });
                return;
            }

            // reverse the actions array so that the most recent action is first
            actions.reverse();

            // map the actions to the desired format
            const res_json = actions.map(async (action) => {
                // search for the user that matches the action's user id for the isAdmin field
                const user = await prisma.user.findUnique({
                    where: {
                        username: action.username
                    }
                });

                return {
                    User: {
                        Username: action.username,
                        isAdmin: user?.role === "ADMIN",
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
            res.status(200).json(await Promise.all(res_json));            
        })().catch((err: Error) => {
            res.status(500).json(err);
        });
    } else if (req.method === 'DELETE') {
        // if the request method is DELETE, delete the package and return 200
        (async () => {
            // search for the exact package that matches the name
            const indivPkg = await prisma.indivPkg.findUnique({
                where: {
                    name: nameStr
                }
            });
            
            // if no package matches the name, return 404
            if (!indivPkg) {
                res.status(404).json({ error: 'No package matches the name.' });
                return;
            }

            // delete the package
            await prisma.indivPkg.delete({
                where: {
                    name: nameStr
                }
            });

            res.status(200).json({ message: 'Package deleted.' });
        })().catch((err: Error) => {
            res.status(500).json(err);
        });
    } else {
        // if the request method is not POST or DELETE, return 404
        res.status(404).json({ error: 'This API endpoint only supports GET and DELETE requests.' });
    }
};

export default authMiddleware(nameHandler);
// export default nameHandler;
