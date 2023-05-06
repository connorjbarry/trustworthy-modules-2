/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { NextApiRequest, NextApiResponse } from "next";
// import authMiddleware from "~/middleware/authMiddleware";
import { prisma } from "~/server/db";
import axios from "axios";
import StreamZip from "node-stream-zip";
import * as fs from "fs";
import * as Path from "path";
import authMiddleware from "~/middleware/authMiddleware";

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

  const content = (req.body.Content ?? "") as string;
  let url = (req.body.URL ?? "") as string;
  const jsProgram = (req.body.JSProgram ?? "") as string;
  let authToken = req.headers["x-authorization"] as string;
  if (authToken && authToken.split(" ")[0]?.toLowerCase() == "bearer") {
    authToken = authToken.split(" ")[1] as string;
  }

  let bearerToken = null;
  if (!authToken) {
    bearerToken = req.headers.authorization as string;
    // remove the "Bearer " part from the token
  }

  // if (!bearerToken && !authToken) {
  //   res.status(400).json({
  //     error:
  //       "There is missing fields(s) in the PackageData/AuthenticationToken or it is formed improperly",
  //   });
  //   return;
  // }

  const token = authToken
    ? authToken
    : bearerToken
    ? bearerToken.split(" ")[1]
    : "";

  if (content === "" && url === "") {
    return res.status(400).json({
      code: "400",
      message:
        "There is missing field(s) in the PackageData/AuthenticationToken or it is formed improperly.",
    });
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

  let base64 = "";
  // let file = "";
  let path = Path.dirname(__dirname);
  path = Path.dirname(path);
  path = Path.dirname(path);
  path = Path.dirname(path);
  const filename = "master.zip";
  path = Path.join(path, filename);
  let downloaded_zip_name = "";

  if (needsIngestion) {
    try {
      await axios
        .get(`${url}/archive/master.zip`, { responseType: "arraybuffer" })
        .then((response) => {
          downloaded_zip_name =
            response.headers["content-disposition"].split("filename=")[1];
          downloaded_zip_name = downloaded_zip_name.replace(".zip", "");
          fs.writeFileSync(path, response.data);
        });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        code: "500",
        message: "Internal Server Error, could not download zip file.",
      });
    }
    const store_file = fs.readFileSync(path);
    // convert the byte buffer to a base64 string
    base64 = store_file.toString("base64");
  }

  // after we determine if we need to ingest the package, we have a base64 representation of the zip file of the package, we now need to read into this and get the name, author, and version of the package from the package.json file
  base64 = needsIngestion ? base64 : content;

  try {
    if (!needsIngestion) {
      fs.writeFileSync(path, base64, "base64");
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      code: "500",
      message: "Internal Server Error, could not write zip file.",
    });
  }
  // if we don't need to ingest the package, we need to download the base64 and write it as a zip file to the root directory named master.zip

  const zip = new StreamZip({
    file: "master.zip",
    storeEntries: true,
  });

  let name = "";
  let version = "";
  let author = "";

  try {
    zip.on("ready", () => {
      const entries = Object.values(zip.entries());
      // print all entry names
      // print the last entry
      // console.log(entries[entries.length - 1]);
      if (downloaded_zip_name == "") {
        downloaded_zip_name = entries[entries.length - 1]?.name.split(
          "/"
        )[0] as string;
      }

      const pkgJson = entries.find(
        (entry) => entry.name === `${downloaded_zip_name}/package.json`
      );

      // console.log("pkgJson: ", pkgJson);

      if (!pkgJson) {
        res.status(400).json({
          code: "400",
          message: "Package.json not found in zip file.",
        });
        return;
      }

      const pkgJsonContent = zip.entryDataSync(pkgJson).toString("utf8");

      const pkgJsonObj = JSON.parse(pkgJsonContent);
      name = pkgJsonObj.name;
      version = pkgJsonObj.version;
      author = pkgJsonObj.author;
      if (url === "") {
        url = pkgJsonObj.repository.url;
      }

      if (!name || !version || !author) {
        res.status(400).json({
          code: "400",
          message: "Package.json is missing required fields.",
        });
        return;
      }
    });
  } catch (e) {
    return res.status(500).json({
      code: "500",
      message: "Internal Server Error, could not read zip file.",
    });
  }

  setTimeout(() => {
    zip.close();
    console.log("closed zip");
  }, 1000);

  const user = await prisma.user.findUnique({
    where: {
      apiKey: token,
    },
  });

  const body = await prisma.indivPkg.create({
    data: {
      name: name,
      version: version,
      author: author,
      githubLink: url,
      fileURL: base64,
      JSProgram: jsProgram,
      actions: {
        create: {
          action: "CREATE",
          username: user?.username ?? "",
        },
      },
    },
  });

  // const body = await prisma.indivPkg.findMany();

  res.status(201).json({
    metadata: {
      name: body.name,
      version: body.version,
      id: body.id,
    },
    data: {
      content: body.fileURL,
      JSProgram: body.JSProgram,
    },
  });
};

export default authMiddleware(handler);
