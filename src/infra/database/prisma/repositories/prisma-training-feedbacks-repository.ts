import { PaginationParams } from '@/core/types/pagination-params'
import { TrainingFeedbacksRepository } from '@/domain/progress-tracking/applications/repositories/training-feedbacks-repository'
import { TrainingFeedback } from '@/domain/progress-tracking/enterprise/entities/training-feedback'
import { PrismaService } from '../prisma.service'
import { PrismaTrainingFeedbackMapper } from '../mappers/prisma-training-feedback-mapper'
import { Injectable } from '@nestjs/common'
import { PrismaExerciseExecutionMapper } from '../mappers/prisma-exercise-execution-mapper'

@Injectable()
export class PrismaTrainingFeedbacksRepository
  implements TrainingFeedbacksRepository
{
  constructor(private prisma: PrismaService) {}

  async findMany({ page }: PaginationParams) {
    const trainingFeedbacks =
      await this.prisma.trainingExecutionFeedback.findMany({
        skip: (page - 1) * 20,
        take: page * 20,
        include: {
          student: true,
          training: true,
        },
      })

    return trainingFeedbacks.map(PrismaTrainingFeedbackMapper.toDomain)
  }

  async findManyByUserId(id: string) {
    const trainingFeedbacks =
      await this.prisma.trainingExecutionFeedback.findMany({
        where: {
          studentId: id,
        },
        include: {
          student: true,
          training: true,
        },
      })

    return trainingFeedbacks.map(PrismaTrainingFeedbackMapper.toDomain)
  }

  async findById(id: string) {
    const trainingFeedback =
      await this.prisma.trainingExecutionFeedback.findUnique({
        where: {
          id,
        },
        include: {
          student: true,
          training: true,
        },
      })

    if (!trainingFeedback) {
      return null
    }

    return PrismaTrainingFeedbackMapper.toDomain(trainingFeedback)
  }

  async create(trainingExecution: TrainingFeedback) {
    const data = PrismaTrainingFeedbackMapper.toPrisma(trainingExecution)
    const dataExercise = trainingExecution.exercises.map(
      PrismaExerciseExecutionMapper.toPrisma,
    )
    await this.prisma.trainingExecutionFeedback.create({
      data,
    })
    await this.prisma.exerciseExecution.createMany({
      data: dataExercise,
    })
  }

  async save(trainingExecution: TrainingFeedback) {
    const data = PrismaTrainingFeedbackMapper.toPrisma(trainingExecution)
    await this.prisma.trainingExecutionFeedback.update({
      data,
      where: {
        id: data.id,
      },
    })
  }
}
