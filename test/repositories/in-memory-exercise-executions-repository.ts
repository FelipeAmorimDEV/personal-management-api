import { PaginationParams } from '@/core/types/pagination-params'
import { ExerciseExecutionsRepository } from '@/domain/progress-tracking/applications/repositories/exercise-executions-repository'
import { StudentExerciseExecution } from '@/domain/progress-tracking/enterprise/entities/student-exercise-execution'
import { StudentExerciseExecutionWithDetails } from '@/domain/progress-tracking/enterprise/entities/value-objects/student-exercise-execution-with-details'
import { InMemoryExercisesRepository } from './in-memory-exercises-repository'
import { GroupByExercise } from '@/infra/database/prisma/repositories/prisma-exercise-executions-repository'

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
    // Filtra as execuções de exercícios pelo studentId (userId)
    const exerciseExecutions = this.items.filter(
      (item) => item.studentId.toString() === userId,
    )

    // Agrupando as execuções por exercício usando reduce
    const groupedByExercise = exerciseExecutions.reduce(
      (acc, execution) => {
        // Encontra o exercício correspondente (deve existir no repositório de exercícios)
        const exercise = this.inMemoryExerciseRepository.items.find(
          (exerciseItem) => exerciseItem.id === execution.exerciseId,
        )

        if (!exercise) {
          throw new Error('Exercise not found')
        }

        // Se o exercício não foi encontrado no acumulador, cria um novo grupo
        if (!acc[execution.exerciseId.toString()]) {
          acc[execution.exerciseId.toString()] = {
            exerciseName: exercise.name, // Nome do exercício
            data: [], // Inicia um array para armazenar as execuções
          }
        }

        // Adiciona a execução ao grupo correspondente
        acc[execution.exerciseId.toString()].data.push({
          data: execution.createdAt.toISOString(), // Formato de data em string
          weightUsed: execution.weightUsed,
        })

        return acc
      },
      {} as Record<string, GroupByExercise>,
    )

    // Converte o objeto agrupado em um array de GroupByExercise
    return Object.values(groupedByExercise)
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
