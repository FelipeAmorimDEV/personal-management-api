import { TrainingFeedbackReply } from '../../enterprise/entities/training-feedback-reply'

export abstract class ReplyTrainingFeedbacksRepository {
  abstract findByFeedbackId(
    feedbackId: string,
  ): Promise<TrainingFeedbackReply | null>

  abstract findById(id: string): Promise<TrainingFeedbackReply | null>
  abstract create(trainingFeedbackReply: TrainingFeedbackReply): Promise<void>
  abstract save(trainingFeedbackReply: TrainingFeedbackReply): Promise<void>
}
