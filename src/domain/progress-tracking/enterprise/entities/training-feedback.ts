import { StudentExerciseExecution } from './student-exercise-execution'
import { AggregateRoot } from '@/core/entities/aggregate-root'
import { Optional } from '@/core/types/optional'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { TrainingFeedbackCreatedEvent } from '../events/training-feedback-created-event'

interface FeedbackDetails {
  studentName: string
  trainingName: string
}
export type TrainingFeedbackProps = {
  studentId: UniqueEntityID
  trainingId: UniqueEntityID
  exercises: StudentExerciseExecution[]
  feedbackDetails?: FeedbackDetails
  rate: number
  comment?: string | null
  createdAt: Date
  readAt?: Date | null
}

export class TrainingFeedback extends AggregateRoot<TrainingFeedbackProps> {
  get studentId() {
    return this.props.studentId
  }

  get trainingId() {
    return this.props.trainingId
  }

  get exercises() {
    return this.props.exercises
  }

  set exercises(exercises: StudentExerciseExecution[]) {
    this.props.exercises = exercises
  }

  get feedbackDetails() {
    return this.props.feedbackDetails
  }

  get rate() {
    return this.props.rate
  }

  get comment() {
    return this.props.comment
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
    props: Optional<TrainingFeedbackProps, 'createdAt' | 'exercises'>,
    id?: UniqueEntityID,
  ) {
    const trainingFeedback = new TrainingFeedback(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        exercises: props.exercises ?? [],
      },
      id,
    )

    const isNewFeedback = !id

    if (isNewFeedback) {
      trainingFeedback.addDomainEvent(
        new TrainingFeedbackCreatedEvent(trainingFeedback),
      )
    }

    return trainingFeedback
  }
}
