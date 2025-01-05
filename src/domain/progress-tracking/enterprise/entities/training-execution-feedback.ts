import { Entity } from '@/core/entities/entities'
import { StudentExerciseExecution } from './student-exercise-execution'
import { AggregateRoot } from '@/core/entities/aggregate-root'
import { Optional } from '@/core/types/optional'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'


export type TrainingExecutionFeedbackProps = {
  trainingId: UniqueEntityID
  exercises: StudentExerciseExecution[]
  rate: number
  comment: string
  createdAt: Date
  readAt?: Date | null
}

export class TrainingExecutionFeedback extends AggregateRoot<TrainingExecutionFeedbackProps> {
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

  static create(props: Optional<TrainingExecutionFeedbackProps, 'createdAt' | 'exercises'>, id?: UniqueEntityID) {
    const trainingExecutionFeedback = new TrainingExecutionFeedback({
      ...props,
      createdAt: props.createdAt ?? new Date(),
      exercises: props.exercises ?? []
    }, id)

    return trainingExecutionFeedback
  }
}
