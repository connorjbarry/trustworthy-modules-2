/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { NextApiRequest, NextApiResponse } from "next";
import authMiddleware from "~/middleware/authMiddleware";
// import authMiddleware from "~/middleware/authMiddleware";
import { prisma } from "~/server/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const offset: number = (req.query.offset ?? 0) as number;
  const version = (req.body.version ?? "") as string;
  const name = (req.body.name ?? "") as string;

  const body = await prisma.indivPkg.findMany({
    where: {
      name: name,
      version: version,
    },
    skip: 10 * offset,
    take: 10,
  });
  res.status(200).json(body);
};

// need to send through middleware
// eslint-disable-next-line @typescript-eslint/no-misused-promises
export default authMiddleware(handler);
