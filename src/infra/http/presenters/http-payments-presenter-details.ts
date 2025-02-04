import { Payment } from '@/domain/payments/enterprise/entities/payment'

export class HttpPaymentsDetailsPresenter {
  static toHTTP(payment: Payment) {
    return {
      id: payment.id.toString(),
      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt,
      amount: payment.price,
      methodPayment: payment.methodPayment,
      paymentDate: payment.paymentDate,
      paymentStatus: payment.paymentStatus,
      description: payment.description,
      dueDate: payment.dueDate,
    }
  }
}
