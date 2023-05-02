/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { NextApiRequest, NextApiResponse } from "next";
// import authMiddleware from "~/middleware/authMiddleware";
import { prisma } from "~/server/db";
import StreamZip from "node-stream-zip";

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

  console.log(content, url, jsProgram);

  if ((!content || !url) && !jsProgram) {
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

  const needsIngestion = url !== "";

  // if needsIngestion, we want to download the package as a zip from the provided url and convert to base64 string, store url and base64 string in db

  // if (needsIngestion) {
  //   await fetch(`${url}/archive/master.zip`)
  //     .then((res) => res.blob())
  //     .then((blob) => {
  //       fileReader.readAsDataURL(blob);
  //       console.log(fileReader.result);
  //     });
  // }

  // after we determine if we need to ingest the package, we have a base64 representation of the zip file of the package, we now need to read into this and get the name, author, and version of the package from the package.json file

  // const zip = new StreamZip({
  //   file: content,
  //   storeEntries: true,
  // });
  // console.log(zip);

  // const body = await prisma.indivPkg.findMany();

  res.status(200);
};

export default handler;
