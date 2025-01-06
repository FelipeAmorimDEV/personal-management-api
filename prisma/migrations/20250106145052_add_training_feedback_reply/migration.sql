/*
  Warnings:

  - Added the required column `student_id` to the `training_execution_feedbacks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "training_execution_feedbacks" ADD COLUMN     "student_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "TrainingFeedbackReply" (
    "id" TEXT NOT NULL,
    "reply" TEXT NOT NULL,
    "training_feedback_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "read_at" TIMESTAMP(3),

    CONSTRAINT "TrainingFeedbackReply_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "training_execution_feedbacks" ADD CONSTRAINT "training_execution_feedbacks_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingFeedbackReply" ADD CONSTRAINT "TrainingFeedbackReply_training_feedback_id_fkey" FOREIGN KEY ("training_feedback_id") REFERENCES "training_execution_feedbacks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
