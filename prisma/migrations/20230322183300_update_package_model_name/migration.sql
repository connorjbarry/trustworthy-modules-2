/*
  Warnings:

  - You are about to drop the `Package` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Package";

-- CreateTable
CREATE TABLE "IndivPkg" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "version" TEXT,
    "author" TEXT,
    "githubLink" TEXT,
    "rampUp" DECIMAL(65,30) DEFAULT 0,
    "correctness" DECIMAL(65,30) DEFAULT 0,
    "licenseCompatability" DECIMAL(65,30) DEFAULT 0,
    "busFactor" DECIMAL(65,30) DEFAULT 0,
    "responsiveness" DECIMAL(65,30) DEFAULT 0,
    "fractionDependencies" DECIMAL(65,30) DEFAULT 0,
    "fractionReviewed" DECIMAL(65,30) DEFAULT 0,
    "totalScore" DECIMAL(65,30) DEFAULT 0,
    "fileURL" TEXT,

    CONSTRAINT "IndivPkg_pkey" PRIMARY KEY ("id")
);
