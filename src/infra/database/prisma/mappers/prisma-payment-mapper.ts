import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { MethodPayment } from '@/domain/payments/applications/enums/method-payment'
import { PaymentStatus } from '@/domain/payments/applications/enums/payment-status'
import { Payment } from '@/domain/payments/enterprise/entities/payment'
import { Prisma, Invoice as PrismaInvoice } from '@prisma/client'

export class PrismaPaymentMapper {
  static toDomain(payment: PrismaInvoice) {
    return Payment.create(
      {
        description: payment.description,
        dueDate: payment.dueDate,
        methodPayment: payment.methodPayment
          ? MethodPayment[payment.methodPayment]
          : null,
        paymentDate: payment.paymentDate,
        paymentStatus: PaymentStatus[payment.invoiceStatus],
        price: payment.price,
        studentId: new UniqueEntityID(payment.studentId),
        createdAt: payment.createdAt,
        updatedAt: payment.updatedAt,
      },
      new UniqueEntityID(payment.id),
    )
  }

  static toPrisma(payment: Payment): Prisma.InvoiceUncheckedCreateInput {
    return {
      id: payment.id.toString(),
      description: payment.description,
      dueDate: payment.dueDate,
      methodPayment: payment.methodPayment,
      paymentDate: payment.paymentDate,
      invoiceStatus: payment.paymentStatus,
      price: payment.price,
      studentId: payment.studentId.toString(),
      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt,
    }
  }
}
