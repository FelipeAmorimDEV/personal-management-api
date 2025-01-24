import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { IntensityLevel } from '@/domain/progress-tracking/applications/use-cases/enums/intensity-level'
import { TrainingFeedback } from '@/domain/progress-tracking/enterprise/entities/training-feedback'
import { Prisma } from '@prisma/client'

export class PrismaTrainingFeedbackMapper {
  static toDomain(
    trainingFeedback: Prisma.TrainingExecutionFeedbackGetPayload<{
      include: { student: true; training: true; feedbackReply: true }
    }>,
  ) {
    return TrainingFeedback.create(
      {
        trainingId: new UniqueEntityID(trainingFeedback.trainingId),
        studentId: new UniqueEntityID(trainingFeedback.studentId),
        comment: trainingFeedback.comment,
        intensity: IntensityLevel[trainingFeedback.intensity],
        createdAt: trainingFeedback.createdAt,
        readAt: trainingFeedback.readAt,
        feedbackDetails: {
          trainingName: trainingFeedback.training.name,
          studentName: trainingFeedback.student.name,
        },
        personalAnswer: {
          id: trainingFeedback.feedbackReply?.id,
          reply: trainingFeedback.feedbackReply?.reply,
        },
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
