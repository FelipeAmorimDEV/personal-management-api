import { Entity } from '../../../../core/entities/entities'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import { Optional } from '../../../../core/types/optional'

export interface StudentExerciseProps {
  exerciseId: UniqueEntityID
  trainingId: UniqueEntityID
  sets: number
  repetitions: number
  restTime: number
  createdAt: Date
  updatedAt?: Date
}

export class StudentExercise extends Entity<StudentExerciseProps> {
  get exerciseId() {
    return this.props.exerciseId
  }

  get trainingId() {
    return this.props.trainingId
  }

  get sets() {
    return this.props.sets
  }

  get repetitions() {
    return this.props.repetitions
  }

  get restTime() {
    return this.props.restTime
  }

  static create(
    props: Optional<StudentExerciseProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const studentExercise = new StudentExercise(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return studentExercise
  }
}
