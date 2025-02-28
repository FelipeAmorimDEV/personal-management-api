import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ValueObject } from '@/core/entities/value-object'

export type ExerciseWithDetailsProps = {
  studentExerciseId: UniqueEntityID
  exerciseId: UniqueEntityID
  trainingId: UniqueEntityID
  sets: number
  repetitions: number
  restTime: number
  name: string
  videoUrl: string
  description?: string | null
  createdAt: Date
  updatedAt?: Date
}
export class ExerciseWithDetails extends ValueObject<ExerciseWithDetailsProps> {
  get studentExerciseId() {
    return this.props.studentExerciseId
  }

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

  get createdAt() {
    return this.props.createdAt
  }

  get name() {
    return this.props.name
  }

  get videoUrl() {
    return this.props.videoUrl
  }

  get description() {
    return this.props.description
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(props: ExerciseWithDetailsProps) {
    const exerciseWithDetails = new ExerciseWithDetails(props)

    return exerciseWithDetails
  }
}
