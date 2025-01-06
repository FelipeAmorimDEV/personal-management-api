import { Entity } from '@/core/entities/entities'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

interface TrainingFeedbackReplyProps {
  trainingFeedbackId: UniqueEntityID
  reply: string
  readAt?: Date
  createdAt: Date
}
export class TrainingFeedbackReply extends Entity<TrainingFeedbackReplyProps> {
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

  readFeedback() {
    this.props.readAt = new Date()
  }

  static create(
    props: Optional<TrainingFeedbackReplyProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const trainingFeedbackReply = new TrainingFeedbackReply(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return trainingFeedbackReply
  }
}
