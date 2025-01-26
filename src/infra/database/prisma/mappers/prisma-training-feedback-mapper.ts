import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { IntensityLevel } from '@/domain/progress-tracking/applications/use-cases/enums/intensity-level'
import { TrainingFeedback } from '@/domain/progress-tracking/enterprise/entities/training-feedback'
import { Prisma, TrainingExecutionFeedback } from '@prisma/client'

export class PrismaTrainingFeedbackMapper {
  static toDomain(trainingFeedback: TrainingExecutionFeedback) {
    return TrainingFeedback.create(
      {
        trainingId: new UniqueEntityID(trainingFeedback.trainingId),
        studentId: new UniqueEntityID(trainingFeedback.studentId),
        comment: trainingFeedback.comment,
        intensity: IntensityLevel[trainingFeedback.intensity],
        createdAt: new Date(trainingFeedback.createdAt),
        readAt: trainingFeedback.readAt,
      },
      new UniqueEntityID(trainingFeedback.id),
    )
  }

  static toPrisma(
    trainingFeedback: TrainingFeedback,
  ): Prisma.TrainingExecutionFeedbackUncheckedCreateInput {
    return {
      id: trainingFeedback.id.toString(),
      studentId: trainingFeedback.studentId.toString(),
      trainingId: trainingFeedback.trainingId.toString(),
      intensity: trainingFeedback.intensity,
      comment: trainingFeedback.comment,
      createdAt: trainingFeedback.createdAt,
      readAt: trainingFeedback.readAt,
    }
  }
}
