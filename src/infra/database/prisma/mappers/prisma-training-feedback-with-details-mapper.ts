import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { TrainingFeedbackWithDetails } from '@/domain/progress-tracking/enterprise/entities/value-objects/training-feedback-with-details'
import {
  Training,
  TrainingExecutionFeedback,
  TrainingFeedbackReply,
  User,
} from '@prisma/client'

type PrismaFeedback = TrainingExecutionFeedback & {
  student: User
  training: Training
  feedbackReply?: TrainingFeedbackReply | null
}

export class PrismaTrainingFeedbackWithDetailsMapper {
  static toDomain(trainingFeedback: PrismaFeedback) {
    return TrainingFeedbackWithDetails.create({
      studentId: new UniqueEntityID(trainingFeedback.studentId),
      trainingFeedbackId: new UniqueEntityID(trainingFeedback.id),
      trainingName: trainingFeedback.training.name,
      studentName: trainingFeedback.student.name,
      comment: trainingFeedback.comment,
      intensity: trainingFeedback.intensity,
      personalAnswer: trainingFeedback.feedbackReply?.reply ?? null,
      createdAt: trainingFeedback.createdAt,
    })
  }
}
