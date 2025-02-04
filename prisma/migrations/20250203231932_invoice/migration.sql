/*
  Warnings:

  - You are about to drop the `Anamnesis` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `group_muscle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `my_progress_answer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `training` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `training_feedback_reply` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Anamnesis" DROP CONSTRAINT "Anamnesis_student_id_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_student_id_fkey";

-- DropForeignKey
ALTER TABLE "_ExerciseMuscleGroups" DROP CONSTRAINT "_ExerciseMuscleGroups_B_fkey";

-- DropForeignKey
ALTER TABLE "_TrainingMuscleGroups" DROP CONSTRAINT "_TrainingMuscleGroups_A_fkey";

-- DropForeignKey
ALTER TABLE "_TrainingMuscleGroups" DROP CONSTRAINT "_TrainingMuscleGroups_B_fkey";

-- DropForeignKey
ALTER TABLE "my_progress_answer" DROP CONSTRAINT "my_progress_answer_admin_id_fkey";

-- DropForeignKey
ALTER TABLE "my_progress_answer" DROP CONSTRAINT "my_progress_answer_my_progress_id_fkey";

-- DropForeignKey
ALTER TABLE "student_exercise" DROP CONSTRAINT "student_exercise_training_id_fkey";

-- DropForeignKey
ALTER TABLE "training" DROP CONSTRAINT "training_training_plan_id_fkey";

-- DropForeignKey
ALTER TABLE "training_execution_feedbacks" DROP CONSTRAINT "training_execution_feedbacks_training_id_fkey";

-- DropForeignKey
ALTER TABLE "training_feedback_reply" DROP CONSTRAINT "training_feedback_reply_training_feedback_id_fkey";

-- DropTable
DROP TABLE "Anamnesis";

-- DropTable
DROP TABLE "Payment";

-- DropTable
DROP TABLE "group_muscle";

-- DropTable
DROP TABLE "my_progress_answer";

-- DropTable
DROP TABLE "training";

-- DropTable
DROP TABLE "training_feedback_reply";

-- CreateTable
CREATE TABLE "trainings" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "TrainingType" NOT NULL DEFAULT 'SESSION',
    "daysOfWeek" "DaysOfWeek",
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "training_plan_id" TEXT NOT NULL,

    CONSTRAINT "trainings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "group_muscles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "group_muscles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "training_feedback_replys" (
    "id" TEXT NOT NULL,
    "reply" TEXT NOT NULL,
    "training_feedback_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "read_at" TIMESTAMP(3),

    CONSTRAINT "training_feedback_replys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "my_progress_answers" (
    "id" TEXT NOT NULL,
    "admin_id" TEXT NOT NULL,
    "reply" TEXT NOT NULL,
    "my_progress_id" TEXT NOT NULL,

    CONSTRAINT "my_progress_answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "anamnesis" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "has_heart_problem" BOOLEAN NOT NULL,
    "has_chest_paint_during_activity" BOOLEAN NOT NULL,
    "had_chest_pain_in_last_month" BOOLEAN NOT NULL,
    "has_balance_problems" BOOLEAN NOT NULL,
    "has_bone_or_joint_problem" BOOLEAN NOT NULL,
    "takes_blood_presure_medication" BOOLEAN NOT NULL,
    "has_other_health_issues" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "anamnesis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoices" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "method_payment" "MethodPayment",
    "due_date" TIMESTAMP(3) NOT NULL,
    "payment_date" TIMESTAMP(3),
    "description" TEXT NOT NULL,
    "payment_status" "PaymentStatus" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "training_feedback_replys_training_feedback_id_key" ON "training_feedback_replys"("training_feedback_id");

-- CreateIndex
CREATE UNIQUE INDEX "my_progress_answers_my_progress_id_key" ON "my_progress_answers"("my_progress_id");

-- AddForeignKey
ALTER TABLE "trainings" ADD CONSTRAINT "trainings_training_plan_id_fkey" FOREIGN KEY ("training_plan_id") REFERENCES "training_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_exercise" ADD CONSTRAINT "student_exercise_training_id_fkey" FOREIGN KEY ("training_id") REFERENCES "trainings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "training_execution_feedbacks" ADD CONSTRAINT "training_execution_feedbacks_training_id_fkey" FOREIGN KEY ("training_id") REFERENCES "trainings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "training_feedback_replys" ADD CONSTRAINT "training_feedback_replys_training_feedback_id_fkey" FOREIGN KEY ("training_feedback_id") REFERENCES "training_execution_feedbacks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "my_progress_answers" ADD CONSTRAINT "my_progress_answers_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "my_progress_answers" ADD CONSTRAINT "my_progress_answers_my_progress_id_fkey" FOREIGN KEY ("my_progress_id") REFERENCES "my_progress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anamnesis" ADD CONSTRAINT "anamnesis_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseMuscleGroups" ADD CONSTRAINT "_ExerciseMuscleGroups_B_fkey" FOREIGN KEY ("B") REFERENCES "group_muscles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TrainingMuscleGroups" ADD CONSTRAINT "_TrainingMuscleGroups_A_fkey" FOREIGN KEY ("A") REFERENCES "group_muscles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TrainingMuscleGroups" ADD CONSTRAINT "_TrainingMuscleGroups_B_fkey" FOREIGN KEY ("B") REFERENCES "trainings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
