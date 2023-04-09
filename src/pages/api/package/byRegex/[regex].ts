import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../server/db';
import type { IndivPkg } from '@prisma/client';
import authMiddleware from '../../../../middleware/authMiddleware';

/*
* Regex handler for the /package/byRegex/[regex] API endpoint.
* this endpoint returns an array of packages that match the regex with the following format:
* {
*   Version: <version>,
*   Name: <name>,
* }
*/
const regexHandler = (req: NextApiRequest, res: NextApiResponse) => {
    const { regex } = req.query;
    const regexString = regex as string;

    // if there is missing field(s) or missing authentification, return 400
    if (!regexString) {
        res.status(400).json({ error: 'There is missing field(s) in the PackageRegEx/AuthenticationToken or it is formed improperly.' });
        return;
    }

    console.log("regex: " + regexString)

    // search for packages that match the regex
    prisma.indivPkg.findMany({
        where: {
            name: {
                contains: regexString,
                mode: 'insensitive'
            }
        }
    }).then((indivPkgs: IndivPkg[]) => {
        // if no packages match the regex, return an empty array and 404
        if (indivPkgs.length === 0) {
            res.status(404).json([]);
        } else {
            /* if the regex matches at least one package, 
            * map the results to a new array and return it with the format specified above
            */
            const results = indivPkgs.map((indivPkg: IndivPkg) => {
                return {
                    Version: indivPkg.version,
                    Name: indivPkg.name
                }
            });
            res.status(200).json(results);
        }
    }).catch((err: Error) => {
        res.status(500).json(err);
    });
};

export default authMiddleware(regexHandler);
// export default regexHandler;