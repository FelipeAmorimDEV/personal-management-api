/*
  Warnings:

  - You are about to drop the column `trainingPlanId` on the `Training` table. All the data in the column will be lost.
  - Added the required column `training_plan_id` to the `Training` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Training" DROP CONSTRAINT "Training_trainingPlanId_fkey";

-- AlterTable
ALTER TABLE "Training" DROP COLUMN "trainingPlanId",
ADD COLUMN     "training_plan_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Training" ADD CONSTRAINT "Training_training_plan_id_fkey" FOREIGN KEY ("training_plan_id") REFERENCES "training_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
