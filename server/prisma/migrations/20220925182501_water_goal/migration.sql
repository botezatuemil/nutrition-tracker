/*
  Warnings:

  - You are about to drop the column `unit` on the `ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `meal_type_Id` on the `meal` table. All the data in the column will be lost.
  - You are about to drop the column `meal_type_Id` on the `water` table. All the data in the column will be lost.
  - You are about to drop the column `unit` on the `water` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[journal_id]` on the table `water` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `water_id` to the `journal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `journal_id` to the `water` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "meal" DROP CONSTRAINT "meal_meal_type_Id_fkey";

-- DropForeignKey
ALTER TABLE "water" DROP CONSTRAINT "water_meal_type_Id_fkey";

-- AlterTable
ALTER TABLE "ingredients" DROP COLUMN "unit";

-- AlterTable
ALTER TABLE "journal" ADD COLUMN     "water_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "meal" DROP COLUMN "meal_type_Id",
ADD COLUMN     "meal_type_id" INTEGER,
ALTER COLUMN "nutrient_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "water" DROP COLUMN "meal_type_Id",
DROP COLUMN "unit",
ADD COLUMN     "journal_id" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "unit";

-- DropEnum
DROP TYPE "unit_water";

-- CreateTable
CREATE TABLE "water_goal" (
    "id" SERIAL NOT NULL,
    "liters" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "water_goal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "water_goal_user_id_key" ON "water_goal"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "water_journal_id_key" ON "water"("journal_id");

-- AddForeignKey
ALTER TABLE "meal" ADD CONSTRAINT "meal_meal_type_Id_fkey" FOREIGN KEY ("meal_type_id") REFERENCES "meal_type"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "water" ADD CONSTRAINT "water_journal_id_fkey" FOREIGN KEY ("journal_id") REFERENCES "journal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "water_goal" ADD CONSTRAINT "water_goal_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
