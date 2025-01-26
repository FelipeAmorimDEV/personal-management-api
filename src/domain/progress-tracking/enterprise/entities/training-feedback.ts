import { StudentExerciseExecution } from './student-exercise-execution'
import { AggregateRoot } from '@/core/entities/aggregate-root'
import { Optional } from '@/core/types/optional'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { TrainingFeedbackCreatedEvent } from '../events/training-feedback-created-event'
import { IntensityLevel } from '../../applications/use-cases/enums/intensity-level'

export type TrainingFeedbackProps = {
  studentId: UniqueEntityID
  trainingId: UniqueEntityID
  exercises: StudentExerciseExecution[]
  intensity: IntensityLevel
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

  get intensity() {
    return this.props.intensity
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

  except() {
    return this.props.comment?.substring(0, 60).concat('...')
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
