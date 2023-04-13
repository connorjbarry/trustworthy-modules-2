import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";
import type { IndivPkg } from "@prisma/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id;

  if (!id) {
    res.status(400).json({
      code: "400",
      message:
        "There is missing field(s) in the PackageID/AuthenticationToken or it is formed improperly.",
    });
    return;
  }

  if (req.method === "GET") {
    const body: IndivPkg | null = await prisma.indivPkg.findUnique({
      where: {
        id: id as string,
      },
    });

    if (!body) {
      res.status(404).json({ code: "404", error: "Package does not exist." });
      return;
    }

    const pkgName = body.name;
    const version = body.version;
    const pkgId = body.id;
    const url = body.githubLink;

    res.status(200).json({
      metadata: {
        name: pkgName,
        version: version,
        ID: pkgId,
      },
      data: {
        URL: url,
        JSProgram: "TODO",
      },
    });
    return;
  } else if (req.method === "PUT") {
    const body: IndivPkg | null = await prisma.indivPkg.findUnique({
      where: {
        id: id as string,
      },
    });

    if (!body) {
      res.status(404).json({ code: "404", error: "Package does not exist." });
      return;
    }

    // TODO: NEED TO FIGURE OUT WHAT PARAMS CAN BE UPDATED

    res.status(200).json({ message: "Version is updated." });
  } else if (req.method === "DELETE") {
    const body: IndivPkg | null = await prisma.indivPkg.findUnique({
      where: {
        id: id as string,
      },
    });

    if (!body) {
      res.status(404).json({ code: "404", message: "Package does not exist." });
      return;
    }

    await prisma.indivPkg.delete({
      where: {
        id: id as string,
      },
    });

    res.status(200).json({ message: "Package is deleted." });
  } else {
    res.status(405).json({ code: "405", message: "Method not allowed" });
    return;
  }
};

export default handler;
