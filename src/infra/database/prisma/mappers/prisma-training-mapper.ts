import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { GroupMuscle } from '@/domain/training/applications/use-cases/create-training'
import { Training } from '@/domain/training/enterprise/entities/training'
import { Prisma, Training as PrismaTrainings } from '@prisma/client'

type PrismaTraining = PrismaTrainings & {
  groupMuscle: GroupMuscle[]
}

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
        groupMuscle: training.groupMuscle,
      },
      new UniqueEntityID(training.id),
    )
  }

  static toPrisma(training: Training): Prisma.TrainingUncheckedCreateInput {
    return {
      id: training.id.toString(),
      trainingPlanId: training.trainingPlanId.toString(),
      groupMuscle: {
        connect: training.groupMuscle.map((group) => ({
          id: group.id,
        })),
      },
      name: training.name,
      type: training.type,
      daysOfWeek: training.dayOfWeek,
      createdAt: training.createdAt,
      updatedAt: training.updatedAt,
    }
  }
}
