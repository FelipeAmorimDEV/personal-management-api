-- CreateTable
CREATE TABLE "weight_lifted" (
    "id" TEXT NOT NULL,
    "weightLifted" INTEGER NOT NULL,
    "student_id" TEXT NOT NULL,

    CONSTRAINT "weight_lifted_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "weight_lifted" ADD CONSTRAINT "weight_lifted_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
