import { Either, right } from '@/core/either'
import { ExerciseExecutionsRepository } from '../repositories/exercise-executions-repository'
import { StudentExerciseExecution } from '../../enterprise/entities/student-exercise-execution'
import { Injectable } from '@nestjs/common'

interface FetchExerciseExecutionsUseCaseRequest {
  studentId: string
  exerciseId: string
  page: number
}

type FetchExerciseExecutionsUseCaseResponse = Either<
  null,
  { exerciseExecutions: StudentExerciseExecution[] }
>

@Injectable()
export class FetchExerciseExecutionsUseCase {
  constructor(private exerciseExecutions: ExerciseExecutionsRepository) {}

  async execute({
    exerciseId,
    studentId,
    page,
  }: FetchExerciseExecutionsUseCaseRequest): Promise<FetchExerciseExecutionsUseCaseResponse> {
    const exerciseExecutions =
      await this.exerciseExecutions.fetchManyByUserIdAndExerciseId(
        studentId,
        exerciseId,
        { page },
      )

    return right({ exerciseExecutions })
  }
}
