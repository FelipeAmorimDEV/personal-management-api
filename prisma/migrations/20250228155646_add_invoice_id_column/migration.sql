/*
  Warnings:

  - You are about to drop the column `stripe_payment_intent_id` on the `invoices` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "invoices" DROP COLUMN "stripe_payment_intent_id",
ADD COLUMN     "invoice_id" TEXT;
