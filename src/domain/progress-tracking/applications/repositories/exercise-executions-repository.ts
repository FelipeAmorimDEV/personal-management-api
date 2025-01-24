import { PaginationParams } from '@/core/types/pagination-params'
import { StudentExerciseExecution } from '../../enterprise/entities/student-exercise-execution'

export abstract class ExerciseExecutionsRepository {
  abstract findByUserIdAndExerciseId(
    userId: string,
    exerciseId: string,
  ): Promise<StudentExerciseExecution | null>

  abstract fetchManyByUserId(
    userId: string,
  ): Promise<StudentExerciseExecution[]>

  abstract fetchManyByUserIdAndExerciseId(
    userId: string,
    exerciseId: string,
    params: PaginationParams,
  ): Promise<StudentExerciseExecution[]>

  abstract create(exerciseExecution: StudentExerciseExecution): Promise<void>
}
