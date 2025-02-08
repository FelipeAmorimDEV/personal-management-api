import { Either, right } from '@/core/either'
import { Anamnesis } from '../../enterprise/entities/anamnesis'
import { AnamnesisRepository } from '../repositories/anamnesis-repository'
import { Injectable } from '@nestjs/common'

interface FetchAnamnesisUseCaseRequest {
  studentId: string
}

type FetchAnamnesisUseCaseResponse = Either<null, { anamnesis: Anamnesis[] }>

@Injectable()
export class FetchAnamnesisUseCase {
  constructor(private anamnesisRepository: AnamnesisRepository) {}
  async execute({
    studentId,
  }: FetchAnamnesisUseCaseRequest): Promise<FetchAnamnesisUseCaseResponse> {
    const anamnesis =
      await this.anamnesisRepository.fetchManyByStudentId(studentId)

    return right({ anamnesis })
  }
}
