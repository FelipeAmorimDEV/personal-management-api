import { PaymentsRepository } from '@/domain/payments/applications/repositories/payments-repository'
import { Payment } from '@/domain/payments/enterprise/entities/payment'

export class InMemoryPaymentsRepository implements PaymentsRepository {
  public items: Payment[] = []

  async create(payment: Payment) {
    this.items.push(payment)
  }

  async findById(id: string) {
    const payment = this.items.find((item) => item.id.toString() === id)

    if (!payment) {
      return null
    }
    return payment
  }

  async findManyByStudentId(studentId: string) {
    const payments = this.items.filter(
      (item) => item.studentId.toString() === studentId,
    )

    return payments
  }

  async save(payment: Payment) {
    const itemIndex = this.items.findIndex((item) => item.id === payment.id)
    this.items[itemIndex] = payment
  }
}
