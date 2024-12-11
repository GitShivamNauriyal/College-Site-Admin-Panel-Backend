/*
  Warnings:

  - You are about to drop the column `adminname` on the `Admins` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `TimeTable` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `Admins` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `Admins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TimeTableName` to the `TimeTable` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Admins_adminname_key";

-- AlterTable
ALTER TABLE "Admins" DROP COLUMN "adminname",
ADD COLUMN     "username" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "TimeTable" DROP COLUMN "Name",
ADD COLUMN     "TimeTableName" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Token" (
    "id" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Token_refreshToken_key" ON "Token"("refreshToken");

-- CreateIndex
CREATE UNIQUE INDEX "Admins_username_key" ON "Admins"("username");

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
