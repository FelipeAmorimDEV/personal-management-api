import { Either, left, right } from '@/core/either'
import { PaymentsRepository } from '../repositories/payments-repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Payment } from '../../enterprise/entities/payment'
import { PaymentStatus } from '../enums/payment-status'
import { Injectable } from '@nestjs/common'

interface MarkInvoicePaidUseCaseRequest {
  invoiceId: string
}

type MarkInvoicePaidUseCaseResponse = Either<
  ResourceNotFoundError,
  { invoice: Payment }
>

@Injectable()
export class MarkInvoicePaidUseCase {
  constructor(private paymentsRepository: PaymentsRepository) {}

  async execute({
    invoiceId,
  }: MarkInvoicePaidUseCaseRequest): Promise<MarkInvoicePaidUseCaseResponse> {
    const invoice = await this.paymentsRepository.findByInvoiceId(invoiceId)

    console.log('🔥 Invoice:', invoice)
    if (!invoice) {
      return left(new ResourceNotFoundError())
    }

    invoice.paymentDate = new Date()
    invoice.paymentStatus = PaymentStatus.PAID

    await this.paymentsRepository.save(invoice)

    return right({ invoice })
  }
}
