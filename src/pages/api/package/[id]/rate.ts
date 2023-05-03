import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";
import { run_metrics } from "metrics/run_metrics.mjs";
import authMiddleware from "~/middleware/authMiddleware";


// ingestible, bus_factor, license, ramp_up, responsiveness, correctness, dependency_score, pull_req_score 
type Metrics = {
  ingestible: boolean;
  bus_factor: number | undefined;
  license: number | undefined;
  ramp_up: number | undefined;
  responsiveness: number | undefined;
  correctness: number | undefined;
  dependency_score: number | undefined;
  pull_req_score: number | undefined;
};

/*
* Rate handler for the /package/[id]/rate API endpoint.
* this endpoint returns an array of actions for the given package id with the following format:
* {
  "BusFactor": 0,
  "Correctness": 0,
  "RampUp": 0,
  "ResponsiveMaintainer": 0,
  "LicenseScore": 0,
  "GoodPinningPractice": 0,
  "PullRequest": 0,
  "NetScore": 0
}
*/

const rateHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id;

  // get auth token from the request header and get rid of the "Bearer " part if it exists
  const authToken = req.headers.authorization?.split(" ")[1];

    // only allow GET requests
    if (req.method !== "GET") {
      res.status(405).json({ error: "Only GET requests allowed." });
      return;
    }

    // if there is missing field(s) or missing authentification, return 404
    if (!id) {
      res.status(400).json({ error: "There is missing field(s) in the PackageID/AuthenticationToken or it is formed improperly." });
      return;
    }

    // query the database for the package with the given id
    const indivPkg = await prisma.indivPkg.findUnique({
      where: {
        id: id as string,
      },
    });

    // if no package matches the id, return 404
    if (!indivPkg) {
      res.status(404).json({ error: "No package matches the id." });
      return;
    }

    // if the package has no file, return 404
    if (indivPkg.githubLink === null) {
      res.status(404).json({ error: "No package fileURL" });
      return;
    }

    // run the metrics on the package
    const metrics: Metrics = await run_metrics(indivPkg.githubLink);

    // if some of the metrics are undefined, return 404
    if (metrics.bus_factor === undefined || metrics.correctness === undefined || metrics.ramp_up === undefined || metrics.responsiveness === undefined || metrics.license === undefined || metrics.pull_req_score === undefined || metrics.dependency_score === undefined) {
      res.status(404).json({ error: "Some metrics are undefined." });
      return;
    }

    // calculate the net score average and round to 2 decimal places
    const netScore =  Math.round(((metrics.bus_factor + metrics.correctness + metrics.ramp_up + metrics.responsiveness + metrics.license + metrics.pull_req_score + metrics.dependency_score) / 7) * 100) / 100;

    // update the ratings of the package
    await prisma.indivPkg.update({
      where: {
        id: id as string,
      },
      data: {
        busFactor: metrics.bus_factor * 10,
        correctness: metrics.correctness * 10,
        rampUp: metrics.ramp_up * 10,
        responsiveness: metrics.responsiveness * 10,
        licenseCompatability: metrics.license * 10,
        fractionDependencies: metrics.pull_req_score * 10,
        fractionReviewed: metrics.dependency_score * 10,
        totalScore: netScore * 10,
      },
    });

    // find user with the given auth token
    const user = await prisma.user.findUnique({
      where: {
        apiKey: authToken as string,
      },
    });

    if(user){
      // add RATE action to the action
      await prisma.action.create({
        data: {
          username: user.username ? user.username as string : user.name as string,
          action: "RATE",
          indivPkgId: id as string,
        },
      });
    }

    // return the metrics and net score
    res.status(200).json({
      BusFactor: metrics.bus_factor,
      Correctness: metrics.correctness,
      RampUp: metrics.ramp_up,
      ResponsiveMaintainer: metrics.responsiveness,
      LicenseScore: metrics.license,
      GoodPinningPractice: metrics.pull_req_score,
      PullRequest: metrics.dependency_score,
      NetScore: netScore,
    });
};

export default authMiddleware(rateHandler);
