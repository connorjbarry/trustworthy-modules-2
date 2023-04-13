-- CreateTable
CREATE TABLE "Action" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "indivPkgId" TEXT NOT NULL,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_indivPkgId_fkey" FOREIGN KEY ("indivPkgId") REFERENCES "IndivPkg"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
