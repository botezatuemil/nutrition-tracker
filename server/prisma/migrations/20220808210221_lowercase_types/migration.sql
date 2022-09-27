/*
  Warnings:

  - Changed the type of `unit` on the `ingredients` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `meal_type` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `goal` on the `profile` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `activity` on the `profile` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `unit` on the `water` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "activity" AS ENUM ('SEDENTARY', 'MODERATE', 'ACTIVE');

-- CreateEnum
CREATE TYPE "goal" AS ENUM ('LOSE', 'MANTAIN', 'GAIN');

-- CreateEnum
CREATE TYPE "type" AS ENUM ('BREAKFAST', 'LUNCH', 'DINNER', 'FASTFOOD', 'SNACK');

-- CreateEnum
CREATE TYPE "unit" AS ENUM ('CUPS', 'KG', 'G', 'POUND', 'TABLESPOON');

-- CreateEnum
CREATE TYPE "unit_water" AS ENUM ('MILILITER', 'LITER', 'DECILITER', 'GALON');

-- AlterTable
ALTER TABLE "ingredients" DROP COLUMN "unit",
ADD COLUMN     "unit" "unit" NOT NULL;

-- AlterTable
ALTER TABLE "meal_type" DROP COLUMN "type",
ADD COLUMN     "type" "type" NOT NULL;

-- AlterTable
ALTER TABLE "profile" DROP COLUMN "goal",
ADD COLUMN     "goal" "goal" NOT NULL,
DROP COLUMN "activity",
ADD COLUMN     "activity" "activity" NOT NULL;

-- AlterTable
ALTER TABLE "water" DROP COLUMN "unit",
ADD COLUMN     "unit" "unit_water" NOT NULL;

-- DropEnum
DROP TYPE "Activity";

-- DropEnum
DROP TYPE "Goal";

-- DropEnum
DROP TYPE "Type";

-- DropEnum
DROP TYPE "Unit";

-- DropEnum
DROP TYPE "UnitWater";
