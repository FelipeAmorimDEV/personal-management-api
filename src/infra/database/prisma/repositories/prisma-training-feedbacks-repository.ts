import { PaginationParams } from '@/core/types/pagination-params'
import { TrainingFeedbacksRepository } from '@/domain/progress-tracking/applications/repositories/training-feedbacks-repository'
import { TrainingFeedback } from '@/domain/progress-tracking/enterprise/entities/training-feedback'
import { PrismaService } from '../prisma.service'
import { PrismaTrainingFeedbackMapper } from '../mappers/prisma-training-feedback-mapper'
import { Injectable } from '@nestjs/common'
import { PrismaExerciseExecutionMapper } from '../mappers/prisma-exercise-execution-mapper'
import { getDatesOfWeek } from '@/utils/get-dates-of-week'
import dayjs from 'dayjs'
import { PrismaTrainingFeedbackWithDetailsMapper } from '../mappers/prisma-training-feedback-with-details-mapper'
import { PrismaStudentExerciseMapper } from '../mappers/prisma-student-exercise-mapper'
import { Student } from '@/domain/identity-management/enterprise/entities/student'
import { PrismaStudentMapper } from '../mappers/prisma-student-mapper'

@Injectable()
export class PrismaTrainingFeedbacksRepository
  implements TrainingFeedbacksRepository
{
  constructor(private prisma: PrismaService) {}

  async getUsersWithoutTrainingForDays(days: number): Promise<Student[]> {
    const daysAgo = new Date()
    daysAgo.setDate(daysAgo.getDate() - days)

    const usersWithoutTraining = await this.prisma.user.findMany({
      where: {
        AND: [
          {
            trainingExecutionFeedback: {
              some: {}, // Garante que o usuário já treinou pelo menos uma vez
            },
          },
          {
            trainingExecutionFeedback: {
              none: {
                createdAt: {
                  gte: daysAgo, // Nenhum treino nos últimos X dias
                },
              },
            },
          },
        ],
      },
    })

    return usersWithoutTraining.map(PrismaStudentMapper.toDomain)
  }

  async getTotalWeightLifted(studentId: string) {
    const totalWeightLifted = await this.prisma.weightLifted.findFirst({
      where: {
        studentId,
      },
    })

    if (!totalWeightLifted) {
      return 0
    }

    return totalWeightLifted.weightLifted
  }

  async updateTotalWeightLifted(studentId: string, totalWeightLifted: number) {
    await this.prisma.weightLifted.upsert({
      where: {
        studentId,
      },
      update: {
        weightLifted: totalWeightLifted,
      },
      create: {
        studentId,
        weightLifted: totalWeightLifted,
      },
    })
  }

  async getExerciseDetails(exerciseId: string) {
    const exerciseDetails = await this.prisma.studentExercise.findFirst({
      where: {
        exerciseId,
      },
    })

    if (!exerciseDetails) {
      return null
    }

    return PrismaStudentExerciseMapper.toDomain(exerciseDetails)
  }

  async getTrainingCount(studentId: string): Promise<number> {
    const trainings = this.prisma.trainingExecutionFeedback.count({
      where: {
        studentId,
      },
    })

    return trainings
  }

  async findTrainingFrequencyByUserId(userId: string) {
    const today = new Date()
    const datesOfWeek = getDatesOfWeek(today.toUTCString())

    const frequencyTraining = await Promise.all(
      datesOfWeek.map(async (date) => {
        const startOfDay = dayjs(date).startOf('date').toDate()
        const endOfDay = dayjs(date).endOf('date').toDate()

        const hasTraining =
          await this.prisma.trainingExecutionFeedback.findFirst({
            where: {
              studentId: userId,
              createdAt: {
                gte: startOfDay,
                lte: endOfDay,
              },
            },
          })

        return {
          day: date.getDay(),
          isTraining: !!hasTraining,
          isInvalid: !hasTraining && date.getDay() < today.getDay(),
        }
      }),
    )

    return frequencyTraining
  }

  async findMany({ page }: PaginationParams) {
    const trainingFeedbacks =
      await this.prisma.trainingExecutionFeedback.findMany({
        skip: (page - 1) * 20,
        take: page * 20,
      })

    if (!trainingFeedbacks) {
      return []
    }

    return trainingFeedbacks.map(PrismaTrainingFeedbackMapper.toDomain)
  }

  async fetchManyByUserIdWithDetails(userId: string) {
    const trainingFeedbacks =
      await this.prisma.trainingExecutionFeedback.findMany({
        where: {
          studentId: userId,
        },
        include: {
          student: true,
          training: true,
          feedbackReply: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      })

    if (!trainingFeedbacks) {
      return []
    }

    return trainingFeedbacks.map(
      PrismaTrainingFeedbackWithDetailsMapper.toDomain,
    )
  }

  async findManyByUserId(id: string) {
    const trainingFeedbacks =
      await this.prisma.trainingExecutionFeedback.findMany({
        where: {
          studentId: id,
        },
        orderBy: {
          createdAt: 'desc',
        },
      })

    if (!trainingFeedbacks) {
      return []
    }

    return trainingFeedbacks.map(PrismaTrainingFeedbackMapper.toDomain)
  }

  async findById(id: string) {
    const trainingFeedback =
      await this.prisma.trainingExecutionFeedback.findUnique({
        where: {
          id,
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
