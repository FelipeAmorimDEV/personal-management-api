import { Either, right } from '@/core/either'
import { MyProgressRepository } from '../repositories/my-progress-repository'
import { Injectable } from '@nestjs/common'
import { MyProgressWithDetails } from '../../enterprise/entities/value-objects/my-progress-with-details'

interface FetchMyProgressUpdateUseCaseRequest {
  studentId: string
}

type FetchMyProgressUpdateUseCaseResponse = Either<
  null,
  { myProgressUpdates: MyProgressWithDetails[] }
>
@Injectable()
export class FetchMyProgressUpdateUseCase {
  constructor(private myProgress: MyProgressRepository) {}
  async execute({
    studentId,
  }: FetchMyProgressUpdateUseCaseRequest): Promise<FetchMyProgressUpdateUseCaseResponse> {
    const myProgressUpdates =
      await this.myProgress.fetchManyByStudentId(studentId)

    return right({ myProgressUpdates })
  }
}
