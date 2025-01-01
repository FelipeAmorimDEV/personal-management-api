-- CreateTable
CREATE TABLE "Exercise" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);
