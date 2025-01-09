import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { TrainingFeedbackReplyCreatedEvent } from '../events/training-feedback-reply-created-event'

interface TrainingFeedback {
  trainingName: string
  rate: number
  comment: string | null
}

interface TrainingFeedbackReplyProps {
  trainingFeedbackId: UniqueEntityID
  reply: string
  readAt?: Date | null
  createdAt: Date
  trainingFeedback?: TrainingFeedback | null
}

export class TrainingFeedbackReply extends AggregateRoot<TrainingFeedbackReplyProps> {
  get trainingFeedbackId() {
    return this.props.trainingFeedbackId
  }

  get reply() {
    return this.props.reply
  }

  get readAt() {
    return this.props.readAt
  }

  get createdAt() {
    return this.props.createdAt
  }

  get trainingFeedback() {
    return this.props.trainingFeedback
  }

  readFeedback() {
    this.props.readAt = new Date()
  }

  except() {
    return this.props.reply.substring(0, 56).concat('...')
  }

  static create(
    props: Optional<
      TrainingFeedbackReplyProps,
      'createdAt' | 'trainingFeedback'
    >,
    id?: UniqueEntityID,
  ) {
    const trainingFeedbackReply = new TrainingFeedbackReply(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        trainingFeedback: props.trainingFeedback ?? null,
      },
      id,
    )

    const isNewFeedback = !id

    if (isNewFeedback) {
      trainingFeedbackReply.addDomainEvent(
        new TrainingFeedbackReplyCreatedEvent(trainingFeedbackReply),
      )
    }

    return trainingFeedbackReply
  }
}
