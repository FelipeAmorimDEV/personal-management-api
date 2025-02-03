-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PAID', 'PENDING');

-- CreateEnum
CREATE TYPE "MethodPayment" AS ENUM ('CREDIT_CARD', 'PIX', 'MONEY');

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "method_payment" "MethodPayment" NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,
    "payment_date" TIMESTAMP(3),
    "description" TEXT NOT NULL,
    "payment_status" "PaymentStatus" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
