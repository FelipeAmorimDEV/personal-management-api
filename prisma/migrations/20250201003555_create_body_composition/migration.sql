-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateTable
CREATE TABLE "body_composition" (
    "id" TEXT NOT NULL,
    "height" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,
    "method_name" TEXT NOT NULL,
    "chest" INTEGER NOT NULL,
    "abdominal" INTEGER NOT NULL,
    "thigh" INTEGER NOT NULL,
    "triceps" INTEGER NOT NULL,
    "suprailiac" INTEGER NOT NULL,
    "body_density" INTEGER NOT NULL,
    "body_fat_percentage" INTEGER NOT NULL,
    "lean_mass_percentage" INTEGER NOT NULL,
    "fat_mass_kg" INTEGER NOT NULL,
    "lean_mass_kg" INTEGER NOT NULL,
    "bmi" INTEGER NOT NULL,
    "waist" INTEGER NOT NULL,
    "hip" INTEGER NOT NULL,
    "waist_hip_ratio" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3),
    "student_id" TEXT NOT NULL,

    CONSTRAINT "body_composition_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "body_composition" ADD CONSTRAINT "body_composition_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
