-- CreateTable
CREATE TABLE "my_progress" (
    "id" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "student_id" TEXT NOT NULL,

    CONSTRAINT "my_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "my_progress_answer" (
    "id" TEXT NOT NULL,
    "admin_id" TEXT NOT NULL,
    "reply" TEXT NOT NULL,
    "my_progress_id" TEXT NOT NULL,

    CONSTRAINT "my_progress_answer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "my_progress_answer_my_progress_id_key" ON "my_progress_answer"("my_progress_id");

-- AddForeignKey
ALTER TABLE "my_progress" ADD CONSTRAINT "my_progress_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "my_progress_answer" ADD CONSTRAINT "my_progress_answer_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "my_progress_answer" ADD CONSTRAINT "my_progress_answer_my_progress_id_fkey" FOREIGN KEY ("my_progress_id") REFERENCES "my_progress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
