import { PaymentsRepository } from '@/domain/payments/applications/repositories/payments-repository'
import { Payment } from '@/domain/payments/enterprise/entities/payment'

export class PrismaPaymentRepository implements PaymentsRepository {
  async create(payment: Payment): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async findById(id: string): Promise<Payment | null> {
    throw new Error('Method not implemented.')
  }

  async findManyByStudentId(studentId: string): Promise<Payment[]> {
    throw new Error('Method not implemented.')
  }

  async save(payment: Payment): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
