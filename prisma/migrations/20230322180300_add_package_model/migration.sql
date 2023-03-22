-- CreateTable
CREATE TABLE "Package" (
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

    CONSTRAINT "Package_pkey" PRIMARY KEY ("id")
);
