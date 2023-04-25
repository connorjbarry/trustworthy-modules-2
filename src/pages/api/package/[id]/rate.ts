import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";
import authMiddleware from "../../../../middleware/authMiddleware";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id;

  if (!id) {
    res.status(400).json({
      code: "400",
      error:
        "There is missing field(s) in the PackageID/AuthenticationToken or it is formed improperly",
    });
    return;
  }

  if (req.method !== "GET") {
    res.status(405).json({ code: "405", error: "Method not allowed" });
    return;
  }
  const pkg = await prisma.indivPkg.findUnique({
    where: {
      id: id as string,
    },
  });

  if (!pkg) {
    res.status(404).json({ code: "404", error: "Package does not exist." });
    return;
  }

  const totalScore = pkg.totalScore;

  res.status(200).json({ rating: totalScore });
};

export default authMiddleware(handler);
