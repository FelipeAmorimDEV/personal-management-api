import { Entity } from '@/core/entities/entities'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface MyProgresAnswerProps {
  progressId: UniqueEntityID
  adminId: UniqueEntityID
  reply: string
  createdAt: Date
}

export class MyProgressAnswer extends Entity<MyProgresAnswerProps> {
  get progressId() {
    return this.props.progressId
  }

  get adminId() {
    return this.props.adminId
  }

  get reply() {
    return this.props.reply
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(
    props: Optional<MyProgresAnswerProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const myProgressAnswer = new MyProgressAnswer(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return myProgressAnswer
  }
}
