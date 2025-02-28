-- AlterTable
ALTER TABLE "invoices" ADD COLUMN     "checkout_url" TEXT,
ADD COLUMN     "stripe_payment_intent_id" TEXT;
