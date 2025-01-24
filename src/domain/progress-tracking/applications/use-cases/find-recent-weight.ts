import { Either, left, right } from '@/core/either'
import { ExerciseExecutionsRepository } from '../repositories/exercise-executions-repository'
import { StudentExerciseExecution } from '../../enterprise/entities/student-exercise-execution'
import { Injectable } from '@nestjs/common'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

interface FindRecentWeightUseCaseRequest {
  studentId: string
  exerciseId: string
}

type FindRecentWeightUseCaseResponse = Either<
  ResourceNotFoundError,
  { exerciseExecution: StudentExerciseExecution }
>

@Injectable()
export class FindRecentWeightUseCase {
  constructor(private exerciseExecutions: ExerciseExecutionsRepository) {}

  async execute({
    exerciseId,
    studentId,
  }: FindRecentWeightUseCaseRequest): Promise<FindRecentWeightUseCaseResponse> {
    const exerciseExecution =
      await this.exerciseExecutions.findByUserIdAndExerciseId(
        studentId,
        exerciseId,
      )

    if (!exerciseExecution) {
      return left(new ResourceNotFoundError())
    }

    return right({ exerciseExecution })
  }
}
