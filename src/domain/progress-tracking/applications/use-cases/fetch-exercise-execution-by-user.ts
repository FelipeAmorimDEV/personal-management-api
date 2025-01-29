import { Either, right } from '@/core/either'
import { ExerciseExecutionsRepository } from '../repositories/exercise-executions-repository'
import { Injectable } from '@nestjs/common'
import { StudentExerciseExecutionWithDetails } from '../../enterprise/entities/value-objects/student-exercise-execution-with-details'

interface FetchExerciseExecutionByUserUseCaseRequest {
  studentId: string
}

type FetchExerciseExecutionByUserUseCaseResponse = Either<
  null,
  { exerciseExecutions: StudentExerciseExecutionWithDetails[] }
>

@Injectable()
export class FetchExerciseExecutionByUserUseCase {
  constructor(private exerciseExecutions: ExerciseExecutionsRepository) {}

  async execute({
    studentId,
  }: FetchExerciseExecutionByUserUseCaseRequest): Promise<FetchExerciseExecutionByUserUseCaseResponse> {
    const exerciseExecutions =
      await this.exerciseExecutions.fetchManyByUserIdWithDetails(studentId)

    return right({ exerciseExecutions })
  }
}
