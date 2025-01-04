import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Training } from '@/domain/training/enterprise/entities/training'
import { Prisma, Training as PrismaTraining } from '@prisma/client'

export class PrismaTrainingMapper {
  static toDomain(training: PrismaTraining) {
    return Training.create(
      {
        trainingPlanId: new UniqueEntityID(training.trainingPlanId),
        name: training.name,
        type: training.type,
        dayOfWeek: training.daysOfWeek,
        createdAt: training.createdAt,
        updatedAt: training.updatedAt,
      },
      new UniqueEntityID(training.id),
    )
  }

  static toPrisma(training: Training): Prisma.TrainingUncheckedCreateInput {
    return {
      id: training.id.toString(),
      trainingPlanId: training.trainingPlanId.toString(),
      name: training.name,
      type: training.type,
      daysOfWeek: training.dayOfWeek,
      createdAt: training.createdAt,
      updatedAt: training.updatedAt,
    }
  }
}
