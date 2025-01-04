import { TrainingsRepository } from '@/domain/training/applications/repositories/trainings-repository'
import { Training } from '@/domain/training/enterprise/entities/training'
import { PrismaTrainingMapper } from '../mappers/prisma-training-mapper'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaStudentExerciseMapper } from '../mappers/prisma-student-exercise-mapper'

@Injectable()
export class PrismaTrainingRepository implements TrainingsRepository {
  constructor(private prisma: PrismaService) {}

  async fetchManyByTrainingPlanId(trainingPlanId: string) {
    const trainings = await this.prisma.training.findMany({
      where: {
        trainingPlanId
      }
    })

    return trainings.map(PrismaTrainingMapper.toDomain)
  }

  async create(training: Training): Promise<void> {
    const exercises = training.exercises.currentItems.map(
      PrismaStudentExerciseMapper.toPrisma,
    )
    const data = PrismaTrainingMapper.toPrisma(training)

    await this.prisma.training.create({
      data,
    })
    await this.prisma.studentExercise.createMany({
      data: exercises,
    })
  }
}
