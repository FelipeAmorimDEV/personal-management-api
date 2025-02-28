-- AlterTable
ALTER TABLE "achievements" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "student_achievements" ADD COLUMN     "unlocked_at" TIMESTAMP(3);
