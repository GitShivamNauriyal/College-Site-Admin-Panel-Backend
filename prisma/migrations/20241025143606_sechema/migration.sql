/*
  Warnings:

  - You are about to drop the column `NoticeFile` on the `Notice` table. All the data in the column will be lost.
  - You are about to drop the column `NoticeName` on the `Notice` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[noticeName]` on the table `Notice` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `noticeFile` to the `Notice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `noticeName` to the `Notice` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Notice_NoticeName_key";

-- AlterTable
ALTER TABLE "Notice" DROP COLUMN "NoticeFile",
DROP COLUMN "NoticeName",
ADD COLUMN     "description" TEXT DEFAULT 'No description',
ADD COLUMN     "noticeFile" TEXT NOT NULL,
ADD COLUMN     "noticeName" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Notice_noticeName_key" ON "Notice"("noticeName");
