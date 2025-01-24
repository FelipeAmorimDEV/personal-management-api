import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { TrainingFeedbackReply } from '@/domain/progress-tracking/enterprise/entities/training-feedback-reply'
import {
  Prisma,
  TrainingFeedbackReply as PrismaTrainingFeedbackReply,
} from '@prisma/client'

export class PrismaReplyTrainingFeedbackMapper {
  static toDomain(trainingFeedbackReply: PrismaTrainingFeedbackReply) {
    return TrainingFeedbackReply.create(
      {
        trainingFeedbackId: new UniqueEntityID(
          trainingFeedbackReply.trainingFeedbackId,
        ),
        reply: trainingFeedbackReply.reply,
        readAt: trainingFeedbackReply.readAt,
        createdAt: trainingFeedbackReply.createdAt,
      },
      new UniqueEntityID(trainingFeedbackReply.id),
    )
  }

  static toPrisma(
    trainingFeedbackReply: TrainingFeedbackReply,
  ): Prisma.TrainingFeedbackReplyUncheckedCreateInput {
    return {
      id: trainingFeedbackReply.id.toString(),
      trainingFeedbackId: trainingFeedbackReply.trainingFeedbackId.toString(),
      reply: trainingFeedbackReply.reply,
      createdAt: trainingFeedbackReply.createdAt,
      readAt: trainingFeedbackReply.readAt,
    }
  }
}
