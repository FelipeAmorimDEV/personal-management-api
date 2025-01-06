import { TrainingFeedbackReply } from '@/domain/progress-tracking/enterprise/entities/training-feedback-reply'

export class HttpFeedbackReplyPresenter {
  static toHTTP(feedbackReply: TrainingFeedbackReply) {
    return {
      id: feedbackReply.id.toString(),
      trainingFeedbackId: feedbackReply.trainingFeedbackId.toString(),
      reply: feedbackReply.reply,
      readAt: feedbackReply.readAt,
      createdAt: feedbackReply.createdAt,
      feedback: {
        trainingName: feedbackReply.trainingFeedback?.trainingName,
        rate: feedbackReply.trainingFeedback?.rate,
        comment: feedbackReply.trainingFeedback?.comment,
      },
    }
  }
}
