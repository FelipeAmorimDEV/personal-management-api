import { AnchievementType } from '@prisma/client'
import { Achievement } from '../../enterprise/entities/achievement'

export abstract class AchievementsRepository {
  abstract findAnchievementToUnlock(
    type: AnchievementType,
    progressValue: number,
  ): Promise<Achievement | null>
}
