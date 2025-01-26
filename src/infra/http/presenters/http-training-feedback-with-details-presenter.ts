import { TrainingFeedbackWithDetails } from '@/domain/progress-tracking/enterprise/entities/value-objects/training-feedback-with-details'

export class HttpTrainingFeedbackWithDetailsPresenter {
  static toHTTP(trainingFeedback: TrainingFeedbackWithDetails) {
    return {
      id: trainingFeedback.trainingFeedbackId.toString(),
      studentName: trainingFeedback.studentName,
      trainingName: trainingFeedback.trainingName,
      comment: trainingFeedback.comment,
      intensity: trainingFeedback.intensity,
      personalAnswer: trainingFeedback.personalAnswer,
      createdAt: trainingFeedback.createdAt,
      readAt: trainingFeedback.readAt,
    }
  }
}
