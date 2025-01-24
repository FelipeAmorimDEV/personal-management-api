import { ReplyTrainingFeedbacksRepository } from '@/domain/progress-tracking/applications/repositories/reply-training-feedbacks-repository'
import { TrainingFeedbackReply } from '@/domain/progress-tracking/enterprise/entities/training-feedback-reply'
import { DomainEvents } from '@/core/events/domain-events'

export class InMemoryReplyTrainingFeedbackRepository
  implements ReplyTrainingFeedbacksRepository
{
  public items: TrainingFeedbackReply[] = []

  async findByFeedbackId(feedbackId: string) {
    const reply = this.items.find(
      (item) => item.trainingFeedbackId.toString() === feedbackId,
    )

    if (!reply) {
      return null
    }

    return reply
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
    DomainEvents.dispatchEventsForAggregate(trainingFeedbackReply.id)
  }

  async save(trainingFeedbackReply: TrainingFeedbackReply) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === trainingFeedbackReply.id,
    )
    this.items[itemIndex] = trainingFeedbackReply
    DomainEvents.dispatchEventsForAggregate(trainingFeedbackReply.id)
  }
}
