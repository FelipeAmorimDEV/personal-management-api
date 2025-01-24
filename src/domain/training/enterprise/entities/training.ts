import { AggregateRoot } from '../../../../core/entities/aggregate-root'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import { Optional } from '../../../../core/types/optional'
import { GroupMuscle } from '../../applications/use-cases/create-training'
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

type DayOfWeekType =
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY'

export interface TrainingProps {
  trainingPlanId: UniqueEntityID
  name: string
  type: 'DAY' | 'SESSION'
  dayOfWeek?: DayOfWeekType | null
  exercises: StudentExerciseList
  groupMuscle: GroupMuscle[]
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

  get groupMuscle() {
    return this.props.groupMuscle
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
    props: Optional<TrainingProps, 'createdAt' | 'exercises' | 'groupMuscle'>,
    id?: UniqueEntityID,
  ) {
    const training = new Training(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        exercises: props.exercises ?? new StudentExerciseList(),
        groupMuscle: props.groupMuscle ?? [],
      },
      id,
    )

    return training
  }
}
