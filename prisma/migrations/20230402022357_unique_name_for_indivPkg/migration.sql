/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `IndivPkg` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "IndivPkg_name_key" ON "IndivPkg"("name");
