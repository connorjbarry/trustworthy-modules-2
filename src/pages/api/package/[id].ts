import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id;
  const body = prisma.indivPkg.findUnique({
    where: {
      id: id as string,
    },
  });
  res.status(200).json(body);
};

export default handler;
