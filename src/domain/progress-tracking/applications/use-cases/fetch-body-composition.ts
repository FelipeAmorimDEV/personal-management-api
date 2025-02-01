import { Either, right } from '@/core/either'
import { BodyCompositionsRepository } from '../repositories/body-compositions-repository'
import { BodyComposition } from '../../enterprise/entities/body-composition'
import { Injectable } from '@nestjs/common'

interface FetchBodyCompositionUseCaseRequest {
  studentId: string
}

type FetchBodyCompositionUseCaseResponse = Either<
  null,
  { bodyCompositions: BodyComposition[] }
>

@Injectable()
export class FetchBodyCompositionUseCase {
  constructor(private bodyCompositions: BodyCompositionsRepository) {}
  async execute({
    studentId,
  }: FetchBodyCompositionUseCaseRequest): Promise<FetchBodyCompositionUseCaseResponse> {
    const bodyCompositions =
      await this.bodyCompositions.fetchManyByStudentId(studentId)

    return right({ bodyCompositions })
  }
}
