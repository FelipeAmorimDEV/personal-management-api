import { PaginationParams } from '@/core/types/pagination-params'
import { ExerciseExecutionsRepository } from '@/domain/progress-tracking/applications/repositories/exercise-executions-repository'
import { StudentExerciseExecution } from '@/domain/progress-tracking/enterprise/entities/student-exercise-execution'
import { StudentExerciseExecutionWithDetails } from '@/domain/progress-tracking/enterprise/entities/value-objects/student-exercise-execution-with-details'
import { InMemoryExercisesRepository } from './in-memory-exercises-repository'

export class InMemoryExerciseExecutionsRepository
  implements ExerciseExecutionsRepository
{
  constructor(
    private inMemoryExerciseRepository: InMemoryExercisesRepository,
  ) {}

  public items: StudentExerciseExecution[] = []

  async fetchManyByUserIdWithDetails(userId: string) {
    const exerciseExecution = this.items
      .filter((item) => item.studentId.toString() === userId)
      .map((execution) => {
        const exercise = this.inMemoryExerciseRepository.items.find(
          (exerciseItem) => exerciseItem.id === execution.exerciseId,
        )

        if (!exercise) {
          throw new Error('Exercise not found')
        }

        return StudentExerciseExecutionWithDetails.create({
          exerciseId: exercise.id,
          studentExerciseId: execution.id,
          studentId: execution.studentId,
          feedbackId: execution.feedbackId,
          weightUsed: execution.weightUsed,
          createdAt: execution.createdAt,
        })
      })

    return exerciseExecution
  }

  async findByUserIdAndExerciseId(userId: string, exerciseId: string) {
    const exerciseExecution = this.items.find(
      (item) =>
        item.studentId.toString() === userId &&
        item.exerciseId.toString() === exerciseId,
    )

    if (!exerciseExecution) {
      return null
    }

    return exerciseExecution
  }

  async fetchManyByUserId(userId: string) {
    const exerciseExecutions = this.items.filter(
      (item) => item.studentId.toString() === userId,
    )

    return exerciseExecutions
  }

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
