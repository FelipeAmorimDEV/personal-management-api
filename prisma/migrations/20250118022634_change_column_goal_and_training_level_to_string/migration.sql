/*
  Warnings:

  - Changed the type of `training_level` on the `training_plans` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `goal` on the `training_plans` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "training_plans" DROP COLUMN "training_level",
ADD COLUMN     "training_level" TEXT NOT NULL,
DROP COLUMN "goal",
ADD COLUMN     "goal" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Goal";

-- DropEnum
DROP TYPE "TrainingLevel";
