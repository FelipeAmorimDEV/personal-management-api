import { Either, left, right } from '@/core/either'
import { PaymentsRepository } from '../repositories/payments-repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Payment } from '../../enterprise/entities/payment'
import { Injectable } from '@nestjs/common'

interface VinculaFaturaUseCaseRequest {
  invoiceId: string
  checkoudId: string
}

type VinculaFaturaUseCaseResponse = Either<
  ResourceNotFoundError,
  { invoice: Payment }
>

@Injectable()
export class VinculaFaturaUseCase {
  constructor(private paymentsRepository: PaymentsRepository) {}

  async execute({
    invoiceId,
    checkoudId,
  }: VinculaFaturaUseCaseRequest): Promise<VinculaFaturaUseCaseResponse> {
    const invoice = await this.paymentsRepository.findById(invoiceId)

    if (!invoice) {
      return left(new ResourceNotFoundError())
    }

    invoice.invoiceId = checkoudId

    await this.paymentsRepository.save(invoice)

    return right({ invoice })
  }
}
