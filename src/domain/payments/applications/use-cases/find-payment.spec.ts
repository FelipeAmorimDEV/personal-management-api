import { InMemoryPaymentsRepository } from 'test/repositories/in-memory-payments-repository'
import { FindPaymentUseCase } from './find-payment'
import { Payment } from '../../enterprise/entities/payment'
import { PaymentStatus } from '../enums/payment-status'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let sut: FindPaymentUseCase
let inMemoryPaymentsRepository: InMemoryPaymentsRepository
describe('FindPayment', () => {
  beforeEach(() => {
    inMemoryPaymentsRepository = new InMemoryPaymentsRepository()
    sut = new FindPaymentUseCase(inMemoryPaymentsRepository)
  })
  it('should be defined', async () => {
    const payment = Payment.create({
      studentId: new UniqueEntityID('student-id'),
      description: 'Plano Mensal',
      price: 100,
      dueDate: new Date('2025-02-05'),
      paymentStatus: PaymentStatus.PENDING,
    })
    inMemoryPaymentsRepository.create(payment)

    const result = await sut.execute({
      paymentId: payment.id.toString(),
    })

    if (result.isLeft()) {
      throw new Error()
    }

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.payment).toEqual(payment)
  })
})
