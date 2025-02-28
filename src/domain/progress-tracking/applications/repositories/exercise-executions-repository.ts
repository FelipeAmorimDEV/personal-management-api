import { PaginationParams } from '@/core/types/pagination-params'
import { StudentExerciseExecution } from '../../enterprise/entities/student-exercise-execution'
import { StudentExerciseExecutionWithDetails } from '../../enterprise/entities/value-objects/student-exercise-execution-with-details'
import { GroupByExercise } from '@/infra/database/prisma/repositories/prisma-exercise-executions-repository'

export abstract class ExerciseExecutionsRepository {
  abstract fetchManyByUserId(userId: string): Promise<GroupByExercise[]>

  abstract findByUserIdAndExerciseId(
    userId: string,
    exerciseId: string,
  ): Promise<StudentExerciseExecution | null>

  abstract fetchManyByUserIdWithDetails(
    userId: string,
  ): Promise<StudentExerciseExecutionWithDetails[]>

  abstract fetchManyByUserIdAndExerciseId(
    userId: string,
    exerciseId: string,
    params: PaginationParams,
  ): Promise<StudentExerciseExecution[]>

  abstract create(exerciseExecution: StudentExerciseExecution): Promise<void>
}
