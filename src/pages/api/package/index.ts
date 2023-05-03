/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { NextApiRequest, NextApiResponse } from "next";
// import authMiddleware from "~/middleware/authMiddleware";
import { prisma } from "~/server/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).json({ code: "405", message: "Method not allowed" });
    return;
  }

  if (!req.body) {
    return res
      .status(500)
      .json({ code: "500", message: "Internal Server Error, No Request Body" });
  }

  const content = (req.body.content ?? "") as string;
  const url = (req.body.url ?? "") as string;
  const jsProgram = (req.body.JSProgram ?? "") as string;

  if (!content || !url || !jsProgram) {
    res.status(400).json({
      code: "400",
      message:
        "There is missing field(s) in the PackageData/AuthenticationToken or it is formed improperly.",
    });
    return;
  }

  if (url) {
    const pkg = await prisma.indivPkg.findFirst({
      where: {
        githubLink: url,
      },
    });

    if (pkg) {
      res.status(409).json({
        code: "409",
        message: "Package already exists.",
      });
      return;
    }
  }

  if (content) {
    const pkg = await prisma.indivPkg.findFirst({
      where: {
        fileURL: content,
      },
    });

    if (pkg) {
      res.status(409).json({
        code: "409",
        message: "Package already exists.",
      });
      return;
    }
  }

  // const needsIngestion = url !== "";

  // const body = await prisma.indivPkg.findMany();

  res.status(200);
};

export default handler;
