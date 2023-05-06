/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";
import type { IndivPkg } from "@prisma/client";
import authMiddleware from "~/middleware/authMiddleware";

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

    res.status(200).json({
      metadata: {
        name: pkgName,
        version: version,
        ID: pkgId,
      },
      data: {
        content: body.fileURL,
        JSProgram: body.JSProgram,
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
    const name = (req.body.Name ?? "") as string;
    const version = (req.body.Version ?? "") as string;
    const content = (req.body.Content ?? "") as string;
    const url = (req.body.URL ?? "") as string;
    const jsProgram = (req.body.JSProgram ?? "") as string;

    if (!name || !version || !content || !jsProgram || !url) {
      res.status(400).json({
        code: "400",
        message:
          "There is missing field(s) in the PackageData/AuthenticationToken or it is formed improperly.",
      });
      return;
    }

    await prisma.indivPkg.update({
      where: {
        id: id as string,
      },
      data: {
        name: name,
        version: version,
        githubLink: url,
        fileURL: content,
        JSProgram: jsProgram,
      },
    });

    res.status(200).json({ message: "Package is updated." });
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

// export default handler;

export default authMiddleware(handler);
