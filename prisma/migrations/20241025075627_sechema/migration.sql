/*
  Warnings:

  - You are about to drop the column `fileName` on the `TimeTable` table. All the data in the column will be lost.
  - Added the required column `filePath` to the `TimeTable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `folderName` to the `TimeTable` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TimeTable" DROP COLUMN "fileName",
ADD COLUMN     "filePath" TEXT NOT NULL,
ADD COLUMN     "folderName" TEXT NOT NULL;
