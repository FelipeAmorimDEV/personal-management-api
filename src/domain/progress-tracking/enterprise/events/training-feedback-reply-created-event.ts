import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DomainEvent } from '@/core/events/domain-event'
import { TrainingFeedbackReply } from '../entities/training-feedback-reply'

export class TrainingFeedbackReplyCreatedEvent implements DomainEvent {
  public ocurredAt: Date
  public trainingFeedbackReply: TrainingFeedbackReply

  constructor(trainingFeedbackReply: TrainingFeedbackReply) {
    this.trainingFeedbackReply = trainingFeedbackReply
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityID {
    return this.trainingFeedbackReply.id
  }
}
