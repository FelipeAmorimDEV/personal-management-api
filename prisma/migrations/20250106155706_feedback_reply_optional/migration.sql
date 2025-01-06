/*
  Warnings:

  - A unique constraint covering the columns `[training_feedback_id]` on the table `TrainingFeedbackReply` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TrainingFeedbackReply_training_feedback_id_key" ON "TrainingFeedbackReply"("training_feedback_id");
