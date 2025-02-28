import { Entity } from '@/core/entities/entities'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface StudentAchievementProps {
  studentId: UniqueEntityID
  achievementId: UniqueEntityID
  unlockedAt?: Date | null
}

export class StudentAchievement extends Entity<StudentAchievementProps> {
  get studentId() {
    return this.props.studentId
  }

  get achievementId() {
    return this.props.achievementId
  }

  get unlockedAt() {
    return this.props.unlockedAt
  }

  static create(
    props: Optional<StudentAchievementProps, 'unlockedAt'>,
    id?: UniqueEntityID,
  ) {
    const anchievement = new StudentAchievement(
      {
        ...props,
        unlockedAt: props.unlockedAt ?? new Date(),
      },
      id,
    )

    return anchievement
  }
}
