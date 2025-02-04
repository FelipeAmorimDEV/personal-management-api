import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Payment } from '../../enterprise/entities/payment'
import { FetchPaymentDueUseCase } from './fetch-payment-due'
import { InMemoryPaymentsRepository } from 'test/repositories/in-memory-payments-repository'
import { PaymentStatus } from '../enums/payment-status'

let sut: FetchPaymentDueUseCase
let inMemoryPaymentsRepository: InMemoryPaymentsRepository
describe('FetchPaymentDue', () => {
  beforeEach(() => {
    inMemoryPaymentsRepository = new InMemoryPaymentsRepository()
    sut = new FetchPaymentDueUseCase(inMemoryPaymentsRepository)
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to fetch payment due', async () => {
    const payment = Payment.create({
      studentId: new UniqueEntityID('student-1'),
      description: 'Payment 1',
      dueDate: new Date(2025, 1, 4),
      paymentStatus: PaymentStatus.PENDING,
      price: 100,
    })
    inMemoryPaymentsRepository.create(payment)
    vi.setSystemTime(new Date(2025, 0, 28))

    const result = await sut.execute()
    expect(result.isRight()).toBe(true)
    expect(result.value?.payment).toEqual(payment)
  })
})
