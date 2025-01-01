import { AggregateRoot } from '../../../../core/entities/aggregate-root'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import { Optional } from '../../../../core/types/optional'
import { StudentExerciseList } from './student-exercise-list'

export enum DayOfWeek {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

interface TrainingProps {
  trainingPlanId: UniqueEntityID
  name: string
  type: 'DAY' | 'SESSION'
  dayOfWeek?: DayOfWeek
  exercises: StudentExerciseList
  createdAt: Date
  updatedAt?: Date
}

export class Training extends AggregateRoot<TrainingProps> {
  get trainingPlanId() {
    return this.props.trainingPlanId
  }

  get name() {
    return this.props.name
  }

  get type() {
    return this.props.type
  }

  get dayOfWeek() {
    return this.props.dayOfWeek
  }

  get exercises() {
    return this.props.exercises
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  set exercises(exercises: StudentExerciseList) {
    this.props.exercises = exercises
  }

  static create(
    props: Optional<TrainingProps, 'createdAt' | 'exercises'>,
    id?: UniqueEntityID,
  ) {
    const training = new Training(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        exercises: props.exercises ?? new StudentExerciseList(),
      },
      id,
    )

    return training
  }
}
