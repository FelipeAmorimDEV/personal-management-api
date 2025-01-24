import { Either, right } from '@/core/either'
import { ExerciseExecutionsRepository } from '../repositories/exercise-executions-repository'
import { StudentExerciseExecution } from '../../enterprise/entities/student-exercise-execution'
import { Injectable } from '@nestjs/common'

interface FetchExerciseExecutionByUserUseCaseRequest {
  studentId: string
}

type FetchExerciseExecutionByUserUseCaseResponse = Either<
  null,
  { exerciseExecutions: StudentExerciseExecution[] }
>

@Injectable()
export class FetchExerciseExecutionByUserUseCase {
  constructor(private exerciseExecutions: ExerciseExecutionsRepository) {}

  async execute({
    studentId,
  }: FetchExerciseExecutionByUserUseCaseRequest): Promise<FetchExerciseExecutionByUserUseCaseResponse> {
    const exerciseExecutions =
      await this.exerciseExecutions.fetchManyByUserId(studentId)

    return right({ exerciseExecutions })
  }
}
