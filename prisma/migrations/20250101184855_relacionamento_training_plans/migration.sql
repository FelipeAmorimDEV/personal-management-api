/*
  Warnings:

  - Added the required column `student_id` to the `training_plans` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "training_plans" ADD COLUMN     "student_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "training_plans" ADD CONSTRAINT "training_plans_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
