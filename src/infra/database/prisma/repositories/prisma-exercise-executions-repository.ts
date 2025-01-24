import { PaginationParams } from '@/core/types/pagination-params'
import { ExerciseExecutionsRepository } from '@/domain/progress-tracking/applications/repositories/exercise-executions-repository'
import { StudentExerciseExecution } from '@/domain/progress-tracking/enterprise/entities/student-exercise-execution'
import { PrismaService } from '../prisma.service'
import { PrismaExerciseExecutionMapper } from '../mappers/prisma-exercise-execution-mapper'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaExerciseExecutionsRepository
  implements ExerciseExecutionsRepository
{
  constructor(private prisma: PrismaService) {}

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

    console.log('Exercise Execution', exerciseExecution)

    if (!exerciseExecution) {
      return null
    }

    return PrismaExerciseExecutionMapper.toDomain(exerciseExecution)
  }

  async fetchManyByUserId(userId: string): Promise<StudentExerciseExecution[]> {
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

    return exerciseExecutions.map(PrismaExerciseExecutionMapper.toDomain)
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
}
