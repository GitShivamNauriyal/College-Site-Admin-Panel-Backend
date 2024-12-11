/*
  Warnings:

  - You are about to drop the column `SemesterName` on the `TimeTable` table. All the data in the column will be lost.
  - Added the required column `SemesterNumber` to the `TimeTable` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TimeTable" DROP COLUMN "SemesterName",
ADD COLUMN     "SemesterNumber" TEXT NOT NULL;
