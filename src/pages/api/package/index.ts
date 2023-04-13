import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    res.status(405).json({ code: "405", message: "Method not allowed" });
    return;
  }

  const body = await prisma.indivPkg.findMany();

  res.status(200).json(body);
};

export default handler;
