import { Either, right } from '@/core/either'
import { PaymentsRepository } from '../repositories/payments-repository'
import { Payment } from '../../enterprise/entities/payment'
import { Injectable } from '@nestjs/common'

interface FetchPaymentsUseCaseRequest {
  studentId: string
}

type FetchPaymentsUseCaseResponse = Either<null, { payments: Payment[] }>

@Injectable()
export class FetchPaymentsUseCase {
  constructor(private paymentsRepository: PaymentsRepository) {}
  async execute({
    studentId,
  }: FetchPaymentsUseCaseRequest): Promise<FetchPaymentsUseCaseResponse> {
    const payments =
      await this.paymentsRepository.findManyByStudentId(studentId)

    return right({
      payments,
    })
  }
}
