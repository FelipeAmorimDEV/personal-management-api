import { Either, right } from '@/core/either'
import { ExerciseExecutionsRepository } from '../repositories/exercise-executions-repository'
import { Injectable } from '@nestjs/common'
import { GroupByExercise } from '@/infra/database/prisma/repositories/prisma-exercise-executions-repository'

interface FetchWeightProgressUseCaseRequest {
  studentId: string
}

type FetchWeightProgressUseCaseResponse = Either<
  null,
  {
    exercises: GroupByExercise[]
  }
>

@Injectable()
export class FetchWeightProgressUseCase {
  constructor(private exerciseExecutions: ExerciseExecutionsRepository) {}
  async execute({
    studentId,
  }: FetchWeightProgressUseCaseRequest): Promise<FetchWeightProgressUseCaseResponse> {
    const exercises = await this.exerciseExecutions.fetchManyByUserId(studentId)

    return right({
      exercises,
    })
  }
}
