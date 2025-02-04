import { Payment } from '../../enterprise/entities/payment'

export abstract class PaymentsRepository {
  abstract create(payment: Payment): Promise<void>
  abstract findById(id: string): Promise<Payment | null>
  abstract findPaymentDue(): Promise<Payment | null>
  abstract findManyByStudentId(studentId: string): Promise<Payment[]>
  abstract save(payment: Payment): Promise<void>
}
