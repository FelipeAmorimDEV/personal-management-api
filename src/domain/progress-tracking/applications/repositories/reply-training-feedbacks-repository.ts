import { TrainingFeedbackReply } from '../../enterprise/entities/training-feedback-reply'

export abstract class ReplyTrainingFeedbacksRepository {
  abstract findRepliesForStudent(
    studentId: string,
  ): Promise<TrainingFeedbackReply[]>

  abstract findById(id: string): Promise<TrainingFeedbackReply | null>
  abstract create(trainingFeedbackReply: TrainingFeedbackReply): Promise<void>
  abstract save(trainingFeedbackReply: TrainingFeedbackReply): Promise<void>
}
