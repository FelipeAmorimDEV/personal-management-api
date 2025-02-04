import { PaymentsRepository } from '@/domain/payments/applications/repositories/payments-repository'
import { Payment } from '@/domain/payments/enterprise/entities/payment'

export class InMemoryPaymentsRepository implements PaymentsRepository {
  public items: Payment[] = []

  async findPaymentDue() {
    const today = new Date()
    const sevenDaysFromNow = new Date()
    sevenDaysFromNow.setDate(today.getDate() + 7)

    const payment = this.items.find((item) => {
      const dueDate = item.dueDate ? new Date(item.dueDate) : null
      return dueDate && dueDate >= today && dueDate <= sevenDaysFromNow
    })

    if (!payment) {
      return null
    }

    return payment
  }

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
