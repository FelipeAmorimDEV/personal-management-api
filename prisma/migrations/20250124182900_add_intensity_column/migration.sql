/*
  Warnings:

  - You are about to drop the column `rate` on the `training_execution_feedbacks` table. All the data in the column will be lost.
  - Added the required column `intensity` to the `training_execution_feedbacks` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "IntensityLevel" AS ENUM ('VERY_LOW', 'LOW', 'MODERATE', 'HIGH', 'EXTREME');

-- AlterTable
ALTER TABLE "training_execution_feedbacks" DROP COLUMN "rate",
ADD COLUMN     "intensity" "IntensityLevel" NOT NULL;
