import { TrainingFeedback } from '@/domain/progress-tracking/enterprise/entities/training-feedback'

export class HttpTrainingFeedbackPresenter {
  static toHTTP(trainingFeedback: TrainingFeedback) {
    return {
      id: trainingFeedback.id.toString(),
      comment: trainingFeedback.comment,
      intensity: trainingFeedback.intensity,
      createdAt: trainingFeedback.createdAt,
      readAt: trainingFeedback.readAt,
    }
  }
}
