-- DropForeignKey
ALTER TABLE "Action" DROP CONSTRAINT "Action_indivPkgId_fkey";

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_indivPkgId_fkey" FOREIGN KEY ("indivPkgId") REFERENCES "IndivPkg"("id") ON DELETE CASCADE ON UPDATE CASCADE;
