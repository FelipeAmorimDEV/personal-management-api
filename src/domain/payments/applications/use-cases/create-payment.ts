import { PaymentsRepository } from '../repositories/payments-repository'
import { Either, right } from '@/core/either'
import { Payment } from '../../enterprise/entities/payment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { MethodPayment } from '../enums/method-payment'
import { PaymentStatus } from '../enums/payment-status'
import { Injectable } from '@nestjs/common'
import { StripeServiceRepository } from '../repositories/stripe-service-repository'

interface CreatePaymentUseCaseRequest {
  studentId: string
  methodPayment?: MethodPayment
  paymentStatus: PaymentStatus
  dueDate: string
  paymentDate?: string
  description: string
  price: number
}

type CreatePaymentUseCaseResponse = Either<null, { payment: Payment }>

@Injectable()
export class CreatePaymentUseCase {
  constructor(
    private paymentsRepository: PaymentsRepository,
    private stripeServiceRepository: StripeServiceRepository,
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

    const { url, paymentIntentId } =
      await this.stripeServiceRepository.createCheckoutSession(
        price * 100,
        'brl',
      )

    payment.checkoutUrl = url
    payment.stripePaymentIntentId = paymentIntentId

    console.log('PAYMENT', payment)

    await this.paymentsRepository.create(payment)

    return right({
      payment,
    })
  }
}
