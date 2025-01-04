-- CreateEnum
CREATE TYPE "TrainingPlanStrategy" AS ENUM ('FIXED_DAYS', 'FLEXIBLE_SESSIONS');

-- CreateTable
CREATE TABLE "training_plans" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "goal" TEXT NOT NULL,
    "sessions_per_week" INTEGER NOT NULL,
    "strategy" "TrainingPlanStrategy" NOT NULL DEFAULT 'FLEXIBLE_SESSIONS',
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "training_plans_pkey" PRIMARY KEY ("id")
);
