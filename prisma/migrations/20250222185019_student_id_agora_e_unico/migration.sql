/*
  Warnings:

  - A unique constraint covering the columns `[student_id]` on the table `weight_lifted` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "weight_lifted_student_id_key" ON "weight_lifted"("student_id");
