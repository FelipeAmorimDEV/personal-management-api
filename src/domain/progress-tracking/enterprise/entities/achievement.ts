import { Entity } from '@/core/entities/entities'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { AnchievementType } from '@prisma/client'

export interface AchievementProps {
  name: string
  type: AnchievementType
  description: string
  goal: number
  createdAt: Date
}

export class Achievement extends Entity<AchievementProps> {
  get name() {
    return this.props.name
  }

  get type() {
    return this.props.type
  }

  get description() {
    return this.props.description
  }

  get goal() {
    return this.props.goal
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(
    props: Optional<AchievementProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const anchievement = new Achievement(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return anchievement
  }
}
