/*
  Warnings:

  - You are about to drop the column `TimeTableName` on the `TimeTable` table. All the data in the column will be lost.
  - Added the required column `fileName` to the `TimeTable` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TimeTable" DROP COLUMN "TimeTableName",
ADD COLUMN     "fileName" TEXT NOT NULL;
