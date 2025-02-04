import { Either, left, right } from '@/core/either'
import { Payment } from '../../enterprise/entities/payment'
import { PaymentsRepository } from '../repositories/payments-repository'
import { Injectable } from '@nestjs/common'

type FetchPaymentDueUseCaseResponse = Either<null, { payment: Payment }>

@Injectable()
export class FetchPaymentDueUseCase {
  constructor(private paymentRepository: PaymentsRepository) {}
  async execute(): Promise<FetchPaymentDueUseCaseResponse> {
    const payment = await this.paymentRepository.findPaymentDue()

    if (!payment) {
      return left(null)
    }

    return right({ payment })
  }
}
