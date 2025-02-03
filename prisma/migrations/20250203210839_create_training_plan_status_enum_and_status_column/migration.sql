-- CreateEnum
CREATE TYPE "TrainingPlanStatus" AS ENUM ('ACTIVE', 'SUSPENDED', 'EXPIRED', 'CANCELED');

-- AlterTable
ALTER TABLE "training_plans" ADD COLUMN     "status" "TrainingPlanStatus" NOT NULL DEFAULT 'ACTIVE';
