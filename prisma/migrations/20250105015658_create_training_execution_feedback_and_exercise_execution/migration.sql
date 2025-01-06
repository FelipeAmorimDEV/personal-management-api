-- CreateTable
CREATE TABLE "training_execution_feedbacks" (
    "id" TEXT NOT NULL,
    "rate" INTEGER NOT NULL,
    "comment" TEXT,
    "training_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "read_at" TIMESTAMP(3),

    CONSTRAINT "training_execution_feedbacks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exercise_executions" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "exercise_id" TEXT NOT NULL,
    "weight_used" INTEGER NOT NULL,
    "feedback_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "exercise_executions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "training_execution_feedbacks" ADD CONSTRAINT "training_execution_feedbacks_training_id_fkey" FOREIGN KEY ("training_id") REFERENCES "Training"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_executions" ADD CONSTRAINT "exercise_executions_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_executions" ADD CONSTRAINT "exercise_executions_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "exercises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_executions" ADD CONSTRAINT "exercise_executions_feedback_id_fkey" FOREIGN KEY ("feedback_id") REFERENCES "training_execution_feedbacks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
