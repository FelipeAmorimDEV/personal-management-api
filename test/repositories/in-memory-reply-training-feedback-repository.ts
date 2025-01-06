import { ReplyTrainingFeedbacksRepository } from '@/domain/progress-tracking/applications/repositories/reply-training-feedbacks-repository'
import { TrainingFeedbackReply } from '@/domain/progress-tracking/enterprise/entities/training-feedback-reply'
import { InMemoryTrainingExecutionsRepository } from './in-memory-training-executions-repository'

export class InMemoryReplyTrainingFeedbackRepository
  implements ReplyTrainingFeedbacksRepository
{
  constructor(private trainingFeedback: InMemoryTrainingExecutionsRepository) {}
  public items: TrainingFeedbackReply[] = []

  async findRepliesForStudent(
    studentId: string,
  ): Promise<TrainingFeedbackReply[]> {
    const trainingFeedbacks =
      await this.trainingFeedback.findManyByUserId(studentId)

    return this.items.filter((item) =>
      trainingFeedbacks.some((trainingFeedback) =>
        trainingFeedback.id.equals(item.trainingFeedbackId),
      ),
    )
  }

  async findById(id: string) {
    const trainingFeedbackReply = this.items.find(
      (item) => item.id.toString() === id,
    )

    if (!trainingFeedbackReply) {
      return null
    }

    return trainingFeedbackReply
  }

  async create(trainingFeedbackReply: TrainingFeedbackReply) {
    this.items.push(trainingFeedbackReply)
  }

  async save(trainingFeedbackReply: TrainingFeedbackReply) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === trainingFeedbackReply.id,
    )
    this.items[itemIndex] = trainingFeedbackReply
  }
}
