import { TrainingsRepository } from '@/domain/training/applications/repositories/trainings-repository'
import { Training } from '@/domain/training/enterprise/entities/training'
import { PrismaTrainingMapperWithGroupMuscle } from '../mappers/prisma-training-mapper'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaStudentExerciseMapper } from '../mappers/prisma-student-exercise-mapper'

@Injectable()
export class PrismaTrainingRepository implements TrainingsRepository {
  constructor(private prisma: PrismaService) {}

  async fetchManyByTrainingPlanIdWithGroupsMuscle(trainingPlanId: string) {
    const trainings = await this.prisma.training.findMany({
      where: {
        trainingPlanId,
      },
      include: {
        groupMuscle: true,
      },
    })

    return trainings.map(PrismaTrainingMapperWithGroupMuscle.toDomain)
  }

  async create(training: Training): Promise<void> {
    const exercises = training.exercises.currentItems.map(
      PrismaStudentExerciseMapper.toPrisma,
    )
    const data = PrismaTrainingMapperWithGroupMuscle.toPrisma(training)

    await this.prisma.training.create({ data })
    await this.prisma.studentExercise.createMany({
      data: exercises,
    })
  }
}
