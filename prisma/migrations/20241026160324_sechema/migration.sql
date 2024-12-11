-- CreateTable
CREATE TABLE "Syllabus" (
    "id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "courseName" TEXT NOT NULL,
    "folderName" TEXT NOT NULL,
    "semesterNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Syllabus_pkey" PRIMARY KEY ("id")
);
