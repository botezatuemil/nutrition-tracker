/*
  Warnings:

  - Changed the type of `amount` on the `water` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "water" DROP COLUMN "amount",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "water_goal" ALTER COLUMN "liters" SET DATA TYPE DOUBLE PRECISION;
