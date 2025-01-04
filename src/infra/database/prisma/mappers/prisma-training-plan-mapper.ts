import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { TrainingPlan } from '@/domain/training/enterprise/entities/training-plan'
import { Prisma, TrainingPlan as PrismaTrainingPlan } from '@prisma/client'

export class PrismaTrainingPlanMapper {
  static toDomain(trainingPlan: PrismaTrainingPlan) {
    return TrainingPlan.create({
      name: trainingPlan.name,
      goal: trainingPlan.goal,
      sessionsPerWeek: trainingPlan.sessionsPerWeek,
      startDate: trainingPlan.startDate,
      endDate: trainingPlan.endDate,
      strategy: trainingPlan.strategy,
      studentId: new UniqueEntityID(trainingPlan.studentId),
      createdAt: trainingPlan.createdAt,
      updatedAt: trainingPlan.updatedAt,
    }, new UniqueEntityID(trainingPlan.id))
  }

  static toPrisma(
    trainingPlan: TrainingPlan,
  ): Prisma.TrainingPlanUncheckedCreateInput {
    return {
      id: trainingPlan.id.toString(),
      name: trainingPlan.name,
      goal: trainingPlan.goal,
      sessionsPerWeek: trainingPlan.sessionsPerWeek,
      studentId: trainingPlan.studentId.toString(),
      strategy: trainingPlan.strategy,
      startDate: trainingPlan.startDate,
      endDate: trainingPlan.endDate,
      createdAt: trainingPlan.createdAt,
      updatedAt: trainingPlan.updatedAt,
    }
  }
}
