/*
  Warnings:

  - You are about to drop the column `recipeId` on the `favourites` table. All the data in the column will be lost.
  - You are about to drop the column `mealId` on the `ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `nutrientsId` on the `ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `dateId` on the `journal` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `journal` table. All the data in the column will be lost.
  - You are about to drop the column `mealTypeId` on the `meal` table. All the data in the column will be lost.
  - You are about to drop the column `nutrientsId` on the `meal` table. All the data in the column will be lost.
  - You are about to drop the column `nutrientsId` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `mealId` on the `recipe` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `recipe` table. All the data in the column will be lost.
  - You are about to drop the column `mealTypeId` on the `water` table. All the data in the column will be lost.
  - You are about to drop the `mealType` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[nutrients_id]` on the table `ingredients` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,date_id]` on the table `journal` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nutrient_id]` on the table `meal` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `profile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nutrients_id]` on the table `profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `recipe_id` to the `favourites` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meal_id` to the `ingredients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nutrients_id` to the `ingredients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date_id` to the `journal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `journal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meal_type_Id` to the `meal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nutrient_id` to the `meal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nutrients_id` to the `profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meal_id` to the `recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meal_type_Id` to the `water` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "favourites" DROP CONSTRAINT "favourites_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "ingredients" DROP CONSTRAINT "ingredients_mealId_fkey";

-- DropForeignKey
ALTER TABLE "ingredients" DROP CONSTRAINT "ingredients_nutrientsId_fkey";

-- DropForeignKey
ALTER TABLE "journal" DROP CONSTRAINT "journal_dateId_fkey";

-- DropForeignKey
ALTER TABLE "journal" DROP CONSTRAINT "journal_userId_fkey";

-- DropForeignKey
ALTER TABLE "meal" DROP CONSTRAINT "meal_mealTypeId_fkey";

-- DropForeignKey
ALTER TABLE "meal" DROP CONSTRAINT "meal_nutrientsId_fkey";

-- DropForeignKey
ALTER TABLE "mealType" DROP CONSTRAINT "mealType_journalId_fkey";

-- DropForeignKey
ALTER TABLE "profile" DROP CONSTRAINT "profile_nutrientsId_fkey";

-- DropForeignKey
ALTER TABLE "profile" DROP CONSTRAINT "profile_userId_fkey";

-- DropForeignKey
ALTER TABLE "recipe" DROP CONSTRAINT "recipe_mealId_fkey";

-- DropForeignKey
ALTER TABLE "recipe" DROP CONSTRAINT "recipe_userId_fkey";

-- DropForeignKey
ALTER TABLE "water" DROP CONSTRAINT "water_mealTypeId_fkey";

-- DropIndex
DROP INDEX "ingredients_nutrientsId_key";

-- DropIndex
DROP INDEX "journal_userId_dateId_key";

-- DropIndex
DROP INDEX "meal_nutrientsId_key";

-- DropIndex
DROP INDEX "profile_nutrientsId_key";

-- DropIndex
DROP INDEX "profile_userId_key";

-- AlterTable
ALTER TABLE "favourites" DROP COLUMN "recipeId",
ADD COLUMN     "recipe_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ingredients" DROP COLUMN "mealId",
DROP COLUMN "nutrientsId",
ADD COLUMN     "meal_id" INTEGER NOT NULL,
ADD COLUMN     "nutrients_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "journal" DROP COLUMN "dateId",
DROP COLUMN "userId",
ADD COLUMN     "date_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "meal" DROP COLUMN "mealTypeId",
DROP COLUMN "nutrientsId",
ADD COLUMN     "meal_type_Id" INTEGER NOT NULL,
ADD COLUMN     "nutrient_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "profile" DROP COLUMN "nutrientsId",
DROP COLUMN "userId",
ADD COLUMN     "nutrients_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "recipe" DROP COLUMN "mealId",
DROP COLUMN "userId",
ADD COLUMN     "meal_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "water" DROP COLUMN "mealTypeId",
ADD COLUMN     "meal_type_Id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "mealType";

-- CreateTable
CREATE TABLE "meal_type" (
    "id" SERIAL NOT NULL,
    "hour" TIMESTAMP(3) NOT NULL,
    "journal_id" INTEGER NOT NULL,
    "type" "Type" NOT NULL,

    CONSTRAINT "meal_type_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ingredients_nutrients_id_key" ON "ingredients"("nutrients_id");

-- CreateIndex
CREATE UNIQUE INDEX "journal_user_id_date_id_key" ON "journal"("user_id", "date_id");

-- CreateIndex
CREATE UNIQUE INDEX "meal_nutrient_id_key" ON "meal"("nutrient_id");

-- CreateIndex
CREATE UNIQUE INDEX "profile_user_id_key" ON "profile"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "profile_nutrients_id_key" ON "profile"("nutrients_id");

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_nutrients_id_fkey" FOREIGN KEY ("nutrients_id") REFERENCES "nutrients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "journal" ADD CONSTRAINT "journal_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "journal" ADD CONSTRAINT "journal_date_id_fkey" FOREIGN KEY ("date_id") REFERENCES "date"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meal_type" ADD CONSTRAINT "meal_type_journal_id_fkey" FOREIGN KEY ("journal_id") REFERENCES "journal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meal" ADD CONSTRAINT "meal_nutrient_id_fkey" FOREIGN KEY ("nutrient_id") REFERENCES "nutrients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meal" ADD CONSTRAINT "meal_meal_type_Id_fkey" FOREIGN KEY ("meal_type_Id") REFERENCES "meal_type"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_meal_id_fkey" FOREIGN KEY ("meal_id") REFERENCES "meal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_nutrients_id_fkey" FOREIGN KEY ("nutrients_id") REFERENCES "nutrients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "water" ADD CONSTRAINT "water_meal_type_Id_fkey" FOREIGN KEY ("meal_type_Id") REFERENCES "meal_type"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe" ADD CONSTRAINT "recipe_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe" ADD CONSTRAINT "recipe_meal_id_fkey" FOREIGN KEY ("meal_id") REFERENCES "meal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favourites" ADD CONSTRAINT "favourites_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
