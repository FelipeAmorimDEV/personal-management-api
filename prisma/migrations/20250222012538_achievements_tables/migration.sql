-- CreateEnum
CREATE TYPE "AnchievementType" AS ENUM ('TRAINING_COMPLETED', 'STREAK_DAYS', 'WEIGHT_LIFTED', 'FEEDBACK_GIVEN');

-- CreateTable
CREATE TABLE "achievements" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "goal" INTEGER NOT NULL,
    "type" "AnchievementType" NOT NULL,

    CONSTRAINT "achievements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_achievements" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "achievement_id" TEXT NOT NULL,

    CONSTRAINT "student_achievements_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "student_achievements" ADD CONSTRAINT "student_achievements_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_achievements" ADD CONSTRAINT "student_achievements_achievement_id_fkey" FOREIGN KEY ("achievement_id") REFERENCES "achievements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
