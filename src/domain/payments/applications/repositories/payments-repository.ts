import { Payment } from '../../enterprise/entities/payment'

export interface PaymentsRepository {
  create(payment: Payment): Promise<void>
  findById(id: string): Promise<Payment | null>
  findManyByStudentId(studentId: string): Promise<Payment[]>
  save(payment: Payment): Promise<void>
}
