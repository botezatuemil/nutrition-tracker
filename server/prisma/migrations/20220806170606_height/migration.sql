/*
  Warnings:

  - Added the required column `height` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "height" DOUBLE PRECISION NOT NULL;
