import { Entity } from '@/core/entities/entities'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { PrismaExerciseRelation } from '@/infra/database/prisma/mappers/prisma-exercise-execution-mapper'

export type StudentExerciseExecutionProps = {
  studentId: UniqueEntityID
  exerciseId: UniqueEntityID
  feedbackId: UniqueEntityID
  exercise?: PrismaExerciseRelation
  weightUsed: number
  createdAt: Date
}
export class StudentExerciseExecution extends Entity<StudentExerciseExecutionProps> {
  get studentId() {
    return this.props.studentId
  }

  get exerciseId() {
    return this.props.exerciseId
  }

  get feedbackId() {
    return this.props.feedbackId
  }

  get exercise() {
    return this.props.exercise
  }

  get weightUsed() {
    return this.props.weightUsed
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
