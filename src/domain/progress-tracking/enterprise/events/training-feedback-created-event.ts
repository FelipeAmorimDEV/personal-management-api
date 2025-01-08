import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DomainEvent } from '@/core/events/domain-event'
import { TrainingFeedback } from '../entities/training-feedback'

export class TrainingFeedbackCreatedEvent implements DomainEvent {
  public ocurredAt: Date
  public trainingFeedback: TrainingFeedback

  constructor(trainingFeedback: TrainingFeedback) {
    this.trainingFeedback = trainingFeedback
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityID {
    return this.trainingFeedback.id
  }
}
