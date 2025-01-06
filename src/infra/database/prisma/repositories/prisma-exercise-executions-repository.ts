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
