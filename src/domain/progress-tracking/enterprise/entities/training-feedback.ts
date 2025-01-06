import { StudentExerciseExecution } from './student-exercise-execution'
import { AggregateRoot } from '@/core/entities/aggregate-root'
import { Optional } from '@/core/types/optional'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export type TrainingFeedbackProps = {
  studentId: UniqueEntityID
  trainingId: UniqueEntityID
  exercises: StudentExerciseExecution[]
  rate: number
  comment: string
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

  get rate() {
    return this.props.rate
  }

  get comment() {
    return this.props.comment
  }

  get readAt() {
    return this.props.readAt
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

    return trainingFeedback
  }
}
