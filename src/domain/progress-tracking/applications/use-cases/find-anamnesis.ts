import { Either, left, right } from '@/core/either'
import { Anamnesis } from '../../enterprise/entities/anamnesis'
import { AnamnesisRepository } from '../repositories/anamnesis-repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'

interface FindAnamnesisUseCaseRequest {
  anamnesisId: string
}

type FindAnamnesisUseCaseResponse = Either<
  ResourceNotFoundError,
  { anamnesis: Anamnesis }
>

@Injectable()
export class FindAnamnesisUseCase {
  constructor(private anamnesisRepository: AnamnesisRepository) {}
  async execute({
    anamnesisId,
  }: FindAnamnesisUseCaseRequest): Promise<FindAnamnesisUseCaseResponse> {
    const anamnesis = await this.anamnesisRepository.findById(anamnesisId)

    if (!anamnesis) {
      return left(new ResourceNotFoundError())
    }

    return right({ anamnesis })
  }
}
