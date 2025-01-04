/*
  Warnings:

  - The values [SESSIONS] on the enum `TrainingType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TrainingType_new" AS ENUM ('DAY', 'SESSION');
ALTER TABLE "Training" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "Training" ALTER COLUMN "type" TYPE "TrainingType_new" USING ("type"::text::"TrainingType_new");
ALTER TYPE "TrainingType" RENAME TO "TrainingType_old";
ALTER TYPE "TrainingType_new" RENAME TO "TrainingType";
DROP TYPE "TrainingType_old";
ALTER TABLE "Training" ALTER COLUMN "type" SET DEFAULT 'SESSION';
COMMIT;

-- AlterTable
ALTER TABLE "Training" ALTER COLUMN "type" SET DEFAULT 'SESSION';
