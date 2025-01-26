import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ValueObject } from '@/core/entities/value-object'

export interface TrainingFeedbackWithDetailsProps {
  trainingFeedbackId: UniqueEntityID
  studentId: UniqueEntityID
  comment?: string | null
  intensity: string
  createdAt: Date
  studentName: string
  trainingName: string
  personalAnswer?: string | null
  readAt?: Date | null
}

export class TrainingFeedbackWithDetails extends ValueObject<TrainingFeedbackWithDetailsProps> {
  get trainingFeedbackId() {
    return this.props.trainingFeedbackId
  }

  get studentId() {
    return this.props.studentId
  }

  get comment() {
    return this.props.comment
  }

  get intensity() {
    return this.props.intensity
  }

  get createdAt() {
    return this.props.createdAt
  }

  get studentName() {
    return this.props.studentName
  }

  get trainingName() {
    return this.props.trainingName
  }

  get personalAnswer() {
    return this.props.personalAnswer
  }

  get readAt() {
    return this.props.readAt
  }

  static create(props: TrainingFeedbackWithDetailsProps) {
    const trainingFeedbackWithDetails = new TrainingFeedbackWithDetails(props)

    return trainingFeedbackWithDetails
  }
}
