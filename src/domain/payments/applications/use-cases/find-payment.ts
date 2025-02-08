import { Either, left, right } from '@/core/either'
import { Payment } from '../../enterprise/entities/payment'
import { PaymentsRepository } from '../repositories/payments-repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'

interface FindPaymentUseCaseResponse {
  paymentId: string
}

type FindPaymentUseCaseRequest = Either<
  ResourceNotFoundError,
  { payment: Payment }
>

@Injectable()
export class FindPaymentUseCase {
  constructor(private readonly paymentsRepository: PaymentsRepository) {}
  async execute({
    paymentId,
  }: FindPaymentUseCaseResponse): Promise<FindPaymentUseCaseRequest> {
    const payment = await this.paymentsRepository.findById(paymentId)

    if (!payment) {
      return left(new ResourceNotFoundError())
    }

    return right({ payment })
  }
}
