import { InMemoryPaymentsRepository } from 'test/repositories/in-memory-payments-repository'
import { FetchPaymentsUseCase } from './fetch-payments'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { MethodPayment } from '../enums/method-payment'
import { PaymentStatus } from '../enums/payment-status'
import { Payment } from '../../enterprise/entities/payment'

let sut: FetchPaymentsUseCase
let inMemoryPaymentsRepository: InMemoryPaymentsRepository

describe('Fetch Payments', () => {
  beforeEach(() => {
    inMemoryPaymentsRepository = new InMemoryPaymentsRepository()
    sut = new FetchPaymentsUseCase(inMemoryPaymentsRepository)
  })

  it('should be able to fetch payments', async () => {
    const payment = Payment.create({
      studentId: new UniqueEntityID('student-1'),
      methodPayment: MethodPayment.PIX,
      paymentStatus: PaymentStatus.PENDING,
      description: 'Plano de 3 Meses',
      price: 650,
      dueDate: new Date('2023-08-10'),
    })
    const paymentPaid = Payment.create({
      studentId: new UniqueEntityID('student-1'),
      methodPayment: MethodPayment.PIX,
      paymentStatus: PaymentStatus.PAID,
      description: 'Plano de 3 Meses',
      price: 650,
      dueDate: new Date('2023-08-10'),
      paymentDate: new Date('2023-08-10'),
    })
    inMemoryPaymentsRepository.create(payment)
    inMemoryPaymentsRepository.create(paymentPaid)

    const result = await sut.execute({
      studentId: 'student-1',
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.payments).toHaveLength(2)
    expect(result.value?.payments[0].paymentStatus).toEqual(
      PaymentStatus.PENDING,
    )
    expect(result.value?.payments[1].paymentStatus).toEqual(PaymentStatus.PAID)
  })
})
