import { Payment } from '@/domain/payments/enterprise/entities/payment'

export class HttpPaymentsPresenter {
  static toHTTP(payment: Payment) {
    return {
      id: payment.id.toString(),
      amount: payment.price,
      paymentDate: payment.paymentDate,
      dueDate: payment.dueDate,
      checkoutUrl: payment.checkoutUrl,
      invoiceId: payment.invoiceId,
    }
  }
}
