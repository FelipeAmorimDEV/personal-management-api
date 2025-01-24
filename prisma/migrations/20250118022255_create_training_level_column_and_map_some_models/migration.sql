/*
  Warnings:

  - You are about to drop the `StudentExercise` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Training` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TrainingFeedbackReply` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `training_level` to the `training_plans` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `goal` on the `training_plans` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TrainingLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'ELITE');

-- CreateEnum
CREATE TYPE "Goal" AS ENUM ('HYPERTROPHY', 'WEIGHT_LOSS', 'GENERAL_FITNESS', 'MUSCLE_DEFINITION', 'STRENGTH_TRAINING', 'PHYSICAL_REHABILITATION', 'FLEXIBILITY_TRAINING', 'SPORTS_PERFORMANCE');

-- DropForeignKey
ALTER TABLE "StudentExercise" DROP CONSTRAINT "StudentExercise_exercise_id_fkey";

-- DropForeignKey
ALTER TABLE "StudentExercise" DROP CONSTRAINT "StudentExercise_training_id_fkey";

-- DropForeignKey
ALTER TABLE "Training" DROP CONSTRAINT "Training_training_plan_id_fkey";

-- DropForeignKey
ALTER TABLE "TrainingFeedbackReply" DROP CONSTRAINT "TrainingFeedbackReply_training_feedback_id_fkey";

-- DropForeignKey
ALTER TABLE "training_execution_feedbacks" DROP CONSTRAINT "training_execution_feedbacks_training_id_fkey";

-- AlterTable
ALTER TABLE "training_plans" ADD COLUMN     "training_level" "TrainingLevel" NOT NULL,
DROP COLUMN "goal",
ADD COLUMN     "goal" "Goal" NOT NULL;

-- DropTable
DROP TABLE "StudentExercise";

-- DropTable
DROP TABLE "Training";

-- DropTable
DROP TABLE "TrainingFeedbackReply";

-- CreateTable
CREATE TABLE "training" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "TrainingType" NOT NULL DEFAULT 'SESSION',
    "daysOfWeek" "DaysOfWeek",
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "training_plan_id" TEXT NOT NULL,

    CONSTRAINT "training_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_exercise" (
    "id" TEXT NOT NULL,
    "sets" INTEGER NOT NULL,
    "repetitions" INTEGER NOT NULL,
    "rest_time" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "exercise_id" TEXT NOT NULL,
    "training_id" TEXT NOT NULL,

    CONSTRAINT "student_exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "training_feedback_reply" (
    "id" TEXT NOT NULL,
    "reply" TEXT NOT NULL,
    "training_feedback_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "read_at" TIMESTAMP(3),

    CONSTRAINT "training_feedback_reply_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "training_feedback_reply_training_feedback_id_key" ON "training_feedback_reply"("training_feedback_id");

-- AddForeignKey
ALTER TABLE "training" ADD CONSTRAINT "training_training_plan_id_fkey" FOREIGN KEY ("training_plan_id") REFERENCES "training_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_exercise" ADD CONSTRAINT "student_exercise_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "exercises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_exercise" ADD CONSTRAINT "student_exercise_training_id_fkey" FOREIGN KEY ("training_id") REFERENCES "training"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "training_execution_feedbacks" ADD CONSTRAINT "training_execution_feedbacks_training_id_fkey" FOREIGN KEY ("training_id") REFERENCES "training"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "training_feedback_reply" ADD CONSTRAINT "training_feedback_reply_training_feedback_id_fkey" FOREIGN KEY ("training_feedback_id") REFERENCES "training_execution_feedbacks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
