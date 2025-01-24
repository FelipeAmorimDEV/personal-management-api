import { TrainingFeedback } from '@/domain/progress-tracking/enterprise/entities/training-feedback'

export class HttpTrainingFeedbackPresenter {
  static toHTTP(trainingFeedback: TrainingFeedback) {
    return {
      id: trainingFeedback.id.toString(),
      studentName: trainingFeedback.feedbackDetails?.studentName,
      trainingName: trainingFeedback.feedbackDetails?.trainingName,
      comment: trainingFeedback.comment,
      rate: trainingFeedback.rate,
      personalAnswer: trainingFeedback.personalAnswer?.reply,
      createdAt: trainingFeedback.createdAt,
      readAt: trainingFeedback.readAt,
    }
  }
}
