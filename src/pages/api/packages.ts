import type { NextApiRequest, NextApiResponse } from "next";
// import authMiddleware from "~/middleware/authMiddleware";
import { prisma } from "~/server/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const offset: number = (req.query.offset ?? 0) as number;

  const body = await prisma.indivPkg.findMany({
    skip: 10 * offset,
    take: 10,
  });

  res.status(200).json(body);
};

// need to send through middleware
export default handler;
