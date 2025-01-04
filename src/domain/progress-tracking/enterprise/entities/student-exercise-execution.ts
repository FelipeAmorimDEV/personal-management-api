import { Entity } from '@/core/entities/entities'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

type StudentExerciseExecutionProps = {
  studentId: UniqueEntityID
  exerciseId: UniqueEntityID
  setsCompleted: number
  repsCompleted: number
  weightUsed: number
  restTime: number
  notes: string
  createdAt: Date
}
export class StudentExerciseExecution extends Entity<StudentExerciseExecutionProps> {
  get studentId() {
    return this.props.studentId
  }

  get exerciseId() {
    return this.props.exerciseId
  }

  get setsCompleted() {
    return this.props.setsCompleted
  }

  get repsCompleted() {
    return this.props.repsCompleted
  }

  get weightUsed() {
    return this.props.weightUsed
  }

  get restTime() {
    return this.props.restTime
  }

  get notes() {
    return this.props.notes
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(
    props: Optional<StudentExerciseExecutionProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const studentExerciseExecution = new StudentExerciseExecution(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return studentExerciseExecution
  }
}
