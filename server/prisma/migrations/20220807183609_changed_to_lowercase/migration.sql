/*
  Warnings:

  - You are about to drop the `Date` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Favourites` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ingredients` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Journal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Meal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MealType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Nutrients` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Recipe` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Water` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Favourites" DROP CONSTRAINT "Favourites_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "Ingredients" DROP CONSTRAINT "Ingredients_mealId_fkey";

-- DropForeignKey
ALTER TABLE "Ingredients" DROP CONSTRAINT "Ingredients_nutrientsId_fkey";

-- DropForeignKey
ALTER TABLE "Journal" DROP CONSTRAINT "Journal_dateId_fkey";

-- DropForeignKey
ALTER TABLE "Journal" DROP CONSTRAINT "Journal_userId_fkey";

-- DropForeignKey
ALTER TABLE "Meal" DROP CONSTRAINT "Meal_mealTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Meal" DROP CONSTRAINT "Meal_nutrientsId_fkey";

-- DropForeignKey
ALTER TABLE "MealType" DROP CONSTRAINT "MealType_journalId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_nutrientsId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_mealId_fkey";

-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_userId_fkey";

-- DropForeignKey
ALTER TABLE "Water" DROP CONSTRAINT "Water_mealTypeId_fkey";

-- DropTable
DROP TABLE "Date";

-- DropTable
DROP TABLE "Favourites";

-- DropTable
DROP TABLE "Ingredients";

-- DropTable
DROP TABLE "Journal";

-- DropTable
DROP TABLE "Meal";

-- DropTable
DROP TABLE "MealType";

-- DropTable
DROP TABLE "Nutrients";

-- DropTable
DROP TABLE "Profile";

-- DropTable
DROP TABLE "Recipe";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "Water";

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile" (
    "id" SERIAL NOT NULL,
    "gender" BOOLEAN NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "age" INTEGER NOT NULL,
    "goal" "Goal" NOT NULL,
    "activity" "Activity" NOT NULL,
    "userId" INTEGER NOT NULL,
    "nutrientsId" INTEGER NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "journal" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "dateId" INTEGER NOT NULL,

    CONSTRAINT "journal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "date" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "date_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mealType" (
    "id" SERIAL NOT NULL,
    "hour" TIMESTAMP(3) NOT NULL,
    "journalId" INTEGER NOT NULL,
    "type" "Type" NOT NULL,

    CONSTRAINT "mealType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meal" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "nutrientsId" INTEGER NOT NULL,
    "mealTypeId" INTEGER NOT NULL,

    CONSTRAINT "meal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingredients" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "unit" "Unit" NOT NULL,
    "mealId" INTEGER NOT NULL,
    "nutrientsId" INTEGER NOT NULL,

    CONSTRAINT "ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nutrients" (
    "id" SERIAL NOT NULL,
    "calories" INTEGER NOT NULL,
    "protein" INTEGER NOT NULL,
    "carbs" INTEGER NOT NULL,
    "fat" INTEGER NOT NULL,
    "sugar" INTEGER NOT NULL,

    CONSTRAINT "nutrients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "water" (
    "id" SERIAL NOT NULL,
    "amount" TEXT NOT NULL,
    "unit" "UnitWater" NOT NULL,
    "mealTypeId" INTEGER NOT NULL,

    CONSTRAINT "water_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipe" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "mealId" INTEGER NOT NULL,

    CONSTRAINT "recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favourites" (
    "id" SERIAL NOT NULL,
    "recipeId" INTEGER NOT NULL,

    CONSTRAINT "favourites_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profile_userId_key" ON "profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "profile_nutrientsId_key" ON "profile"("nutrientsId");

-- CreateIndex
CREATE UNIQUE INDEX "journal_userId_dateId_key" ON "journal"("userId", "dateId");

-- CreateIndex
CREATE UNIQUE INDEX "meal_nutrientsId_key" ON "meal"("nutrientsId");

-- CreateIndex
CREATE UNIQUE INDEX "ingredients_nutrientsId_key" ON "ingredients"("nutrientsId");

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_nutrientsId_fkey" FOREIGN KEY ("nutrientsId") REFERENCES "nutrients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "journal" ADD CONSTRAINT "journal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "journal" ADD CONSTRAINT "journal_dateId_fkey" FOREIGN KEY ("dateId") REFERENCES "date"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mealType" ADD CONSTRAINT "mealType_journalId_fkey" FOREIGN KEY ("journalId") REFERENCES "journal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meal" ADD CONSTRAINT "meal_nutrientsId_fkey" FOREIGN KEY ("nutrientsId") REFERENCES "nutrients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meal" ADD CONSTRAINT "meal_mealTypeId_fkey" FOREIGN KEY ("mealTypeId") REFERENCES "mealType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "meal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_nutrientsId_fkey" FOREIGN KEY ("nutrientsId") REFERENCES "nutrients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "water" ADD CONSTRAINT "water_mealTypeId_fkey" FOREIGN KEY ("mealTypeId") REFERENCES "mealType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe" ADD CONSTRAINT "recipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe" ADD CONSTRAINT "recipe_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "meal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favourites" ADD CONSTRAINT "favourites_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
