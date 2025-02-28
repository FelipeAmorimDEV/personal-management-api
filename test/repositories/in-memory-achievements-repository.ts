import { AchievementsRepository } from '@/domain/progress-tracking/applications/repositories/achievements-repository'
import { Achievement } from '@/domain/progress-tracking/enterprise/entities/achievement'
import { AnchievementType } from '@prisma/client'

export class InMemoryAchievementsRepository implements AchievementsRepository {
  public items: Achievement[] = [
    Achievement.create({
      name: 'Training Completed',
      type: 'TRAINING_COMPLETED',
      description: 'Complete a training session',
      goal: 2,
    }),
    Achievement.create({
      name: 'Weight Lifted',
      type: AnchievementType.WEIGHT_LIFTED,
      description: 'Complete a training session',
      goal: 100,
    }),
  ]

  async findAnchievementToUnlock(type: string, progressValue: number) {
    const anchievement = this.items.find(
      (item) => item.type === type && item.goal <= progressValue,
    )

    if (!anchievement) {
      return null
    }

    return anchievement
  }
}
