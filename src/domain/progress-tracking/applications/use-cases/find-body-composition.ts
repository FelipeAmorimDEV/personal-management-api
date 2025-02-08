import { Either, left, right } from '@/core/either'
import { BodyCompositionsRepository } from '../repositories/body-compositions-repository'
import { BodyComposition } from '../../enterprise/entities/body-composition'
import { Injectable } from '@nestjs/common'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

interface FindBodyCompositionUseCaseRequest {
  assessmentId: string
}

type FindBodyCompositionUseCaseResponse = Either<
  ResourceNotFoundError,
  { bodyComposition: BodyComposition }
>

@Injectable()
export class FindBodyCompositionUseCase {
  constructor(private bodyCompositions: BodyCompositionsRepository) {}
  async execute({
    assessmentId,
  }: FindBodyCompositionUseCaseRequest): Promise<FindBodyCompositionUseCaseResponse> {
    const bodyComposition = await this.bodyCompositions.findById(assessmentId)

    if (!bodyComposition) {
      return left(new ResourceNotFoundError())
    }

    return right({ bodyComposition })
  }
}
