import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../server/db';
import type { IndivPkg } from '@prisma/client';

/*
* Regex handler for the /package/byRegex/[regex] API endpoint.
* this endpoint returns an array of packages that match the regex with the following format:
* {
*   Version: <version>,
*   Name: <name>,
* }
*/
const regexHandler = (req: NextApiRequest, res: NextApiResponse) => {
    /* get the regex from the request data
    *  the regex is passed in the body of the request with the following format:
    * {
    *  RegEx: <regex>,  
    * }
    */
    const regex = req.body.RegEx;
    const regexString = regex as string;

    // if there is missing field(s) or missing authentification, return 400
    if (!regexString) {
        res.status(400).json({ error: 'There is missing field(s) in the PackageRegEx/AuthenticationToken or it is formed improperly.' });
        return;
    }

    // use query raw to search for packages that match the regex
    (async () => {
        const indivPkgs = await prisma.$queryRaw<IndivPkg[]>`
            SELECT * FROM "IndivPkg"
            WHERE name ~ ${regexString}
        `;

        // if no packages match the regex, return an empty array and 404
        if (!indivPkgs) {
            res.status(404).json({ error: 'No packages match the regex.' });
            return;
        }

        // for all packages that match the regex, return the name and version
        const res_pkgs = indivPkgs.map((indivPkg) => {
            return {
                Version: indivPkg.version,
                Name: indivPkg.name,
            };
        });

        // return the array of packages that match the regex
        res.status(200).json(res_pkgs);
    })().catch((e) => {
        console.error(e);
        res.status(500).json({ error: 'Internal server error.' });
    });
};

export default regexHandler;