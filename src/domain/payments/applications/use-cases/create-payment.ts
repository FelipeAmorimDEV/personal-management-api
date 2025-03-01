import { PaymentsRepository } from '../repositories/payments-repository'
import { Either, left, right } from '@/core/either'
import { Payment } from '../../enterprise/entities/payment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { MethodPayment } from '../enums/method-payment'
import { PaymentStatus } from '../enums/payment-status'
import { Injectable } from '@nestjs/common'
import { StripeServiceRepository } from '../repositories/stripe-service-repository'
import { UsersRepository } from '@/domain/identity-management/applications/repositories/users-repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

interface CreatePaymentUseCaseRequest {
  studentId: string
  methodPayment?: MethodPayment
  paymentStatus: PaymentStatus
  dueDate: string
  paymentDate?: string
  description: string
  price: number
}

type CreatePaymentUseCaseResponse = Either<
  ResourceNotFoundError,
  { payment: Payment }
>

@Injectable()
export class CreatePaymentUseCase {
  constructor(
    private paymentsRepository: PaymentsRepository,
    private stripeServiceRepository: StripeServiceRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    studentId,
    methodPayment,
    description,
    price,
    paymentStatus,
    dueDate,
    paymentDate,
  }: CreatePaymentUseCaseRequest): Promise<CreatePaymentUseCaseResponse> {
    const payment = Payment.create({
      studentId: new UniqueEntityID(studentId),
      methodPayment,
      description,
      price,
      paymentStatus,
      dueDate: new Date(dueDate),
      paymentDate: paymentDate ? new Date(paymentDate) : null,
    })

    const student = await this.usersRepository.findById(studentId)

    if (!student) {
      return left(new ResourceNotFoundError())
    }

    const { url, invoiceId } =
      await this.stripeServiceRepository.createCheckoutSession(
        price * 100,
        'brl',
        student.email,
        payment.id.toString(),
      )

    payment.checkoutUrl = url
    payment.invoiceId = invoiceId

    console.log('Payment', payment)

    await this.paymentsRepository.create(payment)

    return right({
      payment,
    })
  }
}
