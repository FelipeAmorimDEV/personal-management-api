-- CreateTable
CREATE TABLE "Anamnesis" (
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

    CONSTRAINT "Anamnesis_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Anamnesis" ADD CONSTRAINT "Anamnesis_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
