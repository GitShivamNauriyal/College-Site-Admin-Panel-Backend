/*
  Warnings:

  - You are about to drop the column `SemesterNumber` on the `TimeTable` table. All the data in the column will be lost.
  - Added the required column `semesterNumber` to the `TimeTable` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TimeTable" DROP COLUMN "SemesterNumber",
ADD COLUMN     "semesterNumber" TEXT NOT NULL;
