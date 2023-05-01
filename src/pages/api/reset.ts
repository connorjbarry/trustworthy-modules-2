import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "DELETE") {
    res.status(405).json({ code: "405", message: "Method not allowed" });
    return;
  }

  await prisma.indivPkg.deleteMany();

  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      username: "ece30861defaultadminuser",
      password:
        "correcthorsebatterystaple123(!__+@**(A’”`;DROP TABLE packages;",
      role: "ADMIN",
    },
  });

  res.status(200).json({ message: "Reset successful." });
};

// need to send through middleware

export default handler;
