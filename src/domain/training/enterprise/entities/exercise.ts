import { Entity } from '../../../../core/entities/entities'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import { Optional } from '../../../../core/types/optional'

interface ExerciseProps {
  name: string
  videoUrl: string
  description?: string | null
  createdAt: Date
  updatedAt?: Date
}

export class Exercise extends Entity<ExerciseProps> {
  get name() {
    return this.props.name
  }

  get videoUrl() {
    return this.props.videoUrl
  }

  get description() {
    return this.props.description || ''
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  set name(newName: string) {
    if (newName === undefined) {
      return
    }
    this.props.name = newName
    this.touch()
  }

  set videoUrl(newVideoUrl: string) {
    if (newVideoUrl === undefined) {
      return
    }
    this.props.videoUrl = newVideoUrl
    this.touch()
  }

  set description(newDescription: string) {
    if (newDescription === undefined) {
      return
    }
    this.props.description = newDescription
    this.touch()
  }

  touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<ExerciseProps, 'createdAt' | 'description'>,
    id?: UniqueEntityID,
  ) {
    const exercise = new Exercise(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        description: props.description ?? '',
      },
      id,
    )

    return exercise
  }
}
