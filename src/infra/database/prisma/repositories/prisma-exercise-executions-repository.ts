import { PaginationParams } from '@/core/types/pagination-params'
import { ExerciseExecutionsRepository } from '@/domain/progress-tracking/applications/repositories/exercise-executions-repository'
import { StudentExerciseExecution } from '@/domain/progress-tracking/enterprise/entities/student-exercise-execution'
import { PrismaService } from '../prisma.service'
import { PrismaExerciseExecutionMapper } from '../mappers/prisma-exercise-execution-mapper'
import { Injectable } from '@nestjs/common'
import {
  PrismaExeciseExecution,
  PrismaExerciseExecutionMapperWithDetails,
} from '../mappers/prisma-exercise-execution-with-details-mapper'

type DataGroupByExercise = {
  data: string
  weightUsed: number
}
export type GroupByExercise = {
  exerciseName: string
  data: DataGroupByExercise[]
}
@Injectable()
export class PrismaExerciseExecutionsRepository
  implements ExerciseExecutionsRepository
{
  constructor(private prisma: PrismaService) {}

  async fetchManyByUserId(userId: string) {
    const exerciseExecutions = await this.prisma.exerciseExecution.findMany({
      where: {
        studentId: userId, // Filtro pelo aluno
      },
      include: {
        exercise: {
          include: {
            groupMuscle: true,
          },
        }, // Inclui os detalhes do exercício
      },
      orderBy: {
        createdAt: 'asc', // Ordena pela data de criação (do mais antigo para o mais recente)
      },
    })

    const groupedByExercise = this.groupByExercise(exerciseExecutions)

    // Retorna os dados agrupados para o frontend
    return groupedByExercise
  }

  async findByUserIdAndExerciseId(userId: string, exerciseId: string) {
    const exerciseExecution = await this.prisma.exerciseExecution.findFirst({
      where: {
        studentId: userId,
        exerciseId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    if (!exerciseExecution) {
      return null
    }

    return PrismaExerciseExecutionMapper.toDomain(exerciseExecution)
  }

  async fetchManyByUserIdWithDetails(userId: string) {
    const exerciseExecutions = await this.prisma.exerciseExecution.findMany({
      where: {
        studentId: userId,
      },
      include: {
        exercise: {
          include: {
            groupMuscle: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return exerciseExecutions.map(
      PrismaExerciseExecutionMapperWithDetails.toDomain,
    )
  }

  async fetchManyByUserIdAndExerciseId(
    userId: string,
    exerciseId: string,
    { page }: PaginationParams,
  ) {
    const exerciseExecutions = await this.prisma.exerciseExecution.findMany({
      where: {
        studentId: userId,
        exerciseId,
      },
      include: {
        exercise: {
          include: {
            groupMuscle: true,
          },
        },
      },
      skip: (page - 1) * 20,
      take: 20 * page,
    })

    return exerciseExecutions.map(PrismaExerciseExecutionMapper.toDomain)
  }

  async create(exerciseExecution: StudentExerciseExecution) {
    const data = PrismaExerciseExecutionMapper.toPrisma(exerciseExecution)

    await this.prisma.exerciseExecution.create({
      data,
    })
  }

  private groupByExercise(
    executions: PrismaExeciseExecution[],
  ): GroupByExercise[] {
    const grouped = executions.reduce((acc, execution) => {
      const exerciseId = execution.exerciseId

      if (!acc[exerciseId]) {
        acc[exerciseId] = {
          exerciseName: execution.exercise?.name || '',
          data: [],
        }
      }

      acc[exerciseId].data.push({
        date: execution.createdAt,
        weightUsed: execution.weightUsed,
      })

      return acc
    }, {})

    // Converte o objeto em um array de dados formatados
    return Object.values(grouped)
  }
}
