/*
  Warnings:

  - A unique constraint covering the columns `[nutrientsId]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nutrientsId` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "nutrientsId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Profile_nutrientsId_key" ON "Profile"("nutrientsId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_nutrientsId_fkey" FOREIGN KEY ("nutrientsId") REFERENCES "Nutrients"("id") ON DELETE CASCADE ON UPDATE CASCADE;
