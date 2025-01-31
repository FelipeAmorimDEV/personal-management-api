import { Entity } from '@/core/entities/entities'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface MyProgressProps {
  studentId: UniqueEntityID
  comment: string
  photo: string
  createdAt: Date
}

export class MyProgres extends Entity<MyProgressProps> {
  get studentId() {
    return this.props.studentId
  }

  get comment() {
    return this.props.comment
  }

  get photo() {
    return this.props.photo
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(
    props: Optional<MyProgressProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const myProgress = new MyProgres(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return myProgress
  }
}
