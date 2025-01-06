import { PaginationParams } from '@/core/types/pagination-params'
import { ExerciseExecutionsRepository } from '@/domain/progress-tracking/applications/repositories/exercise-executions-repository'
import { StudentExerciseExecution } from '@/domain/progress-tracking/enterprise/entities/student-exercise-execution'

export class InMemoryExerciseExecutionsRepository
  implements ExerciseExecutionsRepository
{
  public items: StudentExerciseExecution[] = []

  async fetchManyByUserIdAndExerciseId(
    userId: string,
    exerciseId: string,
    params: PaginationParams,
  ) {
    const { page } = params

    const exerciseExecutions = this.items
      .filter(
        (item) =>
          item.studentId.toString() === userId &&
          item.exerciseId.toString() === exerciseId,
      )
      .slice((page - 1) * 20, page * 20)

    return exerciseExecutions
  }

  async create(exerciseExecution: StudentExerciseExecution) {
    this.items.push(exerciseExecution)
  }
}
