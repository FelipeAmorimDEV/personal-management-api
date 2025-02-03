import { InMemoryPaymentsRepository } from 'test/repositories/in-memory-payments-repository'
import { CreatePaymentUseCase } from './create-payment'
import { MethodPayment } from '../enums/method-payment'
import { PaymentStatus } from '../enums/payment-status'

let sut: CreatePaymentUseCase
let inMemoryPaymentsRepository: InMemoryPaymentsRepository
describe('CreatePayment', () => {
  beforeEach(() => {
    inMemoryPaymentsRepository = new InMemoryPaymentsRepository()
    sut = new CreatePaymentUseCase(inMemoryPaymentsRepository)
  })
  it('should be create a payment', async () => {
    const result = await sut.execute({
      studentId: 'student-1',
      methodPayment: MethodPayment.PIX,
      paymentStatus: PaymentStatus.PENDING,
      description: 'Plano de 3 Meses',
      price: 650,
      dueDate: '2023-08-10',
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryPaymentsRepository.items).toHaveLength(1)
    expect(inMemoryPaymentsRepository.items[0]).toEqual(result.value?.payment)
  })

  it('should be able to create a paid payment', async () => {
    const result = await sut.execute({
      studentId: 'student-1',
      methodPayment: MethodPayment.PIX,
      paymentStatus: PaymentStatus.PAID,
      description: 'Plano de 3 Meses',
      price: 650,
      dueDate: '2023-08-10',
      paymentDate: '2023-08-10',
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryPaymentsRepository.items).toHaveLength(1)
    expect(inMemoryPaymentsRepository.items[0]).toEqual(result.value?.payment)
  })
})
