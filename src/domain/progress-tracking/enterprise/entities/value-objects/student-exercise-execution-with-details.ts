import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ValueObject } from '@/core/entities/value-object'
import { GroupMuscle } from '@/domain/training/applications/use-cases/create-training'

type StudentExerciseExecutionWithDetailsProps = {
  studentExerciseId: UniqueEntityID
  studentId: UniqueEntityID
  exerciseId: UniqueEntityID
  feedbackId: UniqueEntityID
  name?: string
  weightUsed: number
  groupMuscle?: GroupMuscle[]
  createdAt: Date
}

export class StudentExerciseExecutionWithDetails extends ValueObject<StudentExerciseExecutionWithDetailsProps> {
  get studentExerciseId() {
    return this.props.studentExerciseId
  }

  get studentId() {
    return this.props.studentId
  }

  get exerciseId() {
    return this.props.exerciseId
  }

  get feedbackId() {
    return this.props.feedbackId
  }

  get name() {
    return this.props.name
  }

  get weightUsed() {
    return this.props.weightUsed
  }

  get groupMuscle() {
    return this.props.groupMuscle
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(props: StudentExerciseExecutionWithDetailsProps) {
    const studentExerciseWithDetails = new StudentExerciseExecutionWithDetails(
      props,
    )

    return studentExerciseWithDetails
  }
}
