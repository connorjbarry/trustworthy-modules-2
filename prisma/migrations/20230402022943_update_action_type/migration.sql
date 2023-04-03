/*
  Warnings:

  - You are about to drop the column `name` on the `Action` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `Action` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `Action` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Action" DROP COLUMN "name",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Action_username_key" ON "Action"("username");
