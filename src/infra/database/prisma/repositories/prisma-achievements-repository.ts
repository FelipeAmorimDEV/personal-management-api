import { AchievementsRepository } from '@/domain/progress-tracking/applications/repositories/achievements-repository'
import { PrismaAchievementsMapper } from '../mappers/prisma-achievement-mapper'
import { PrismaService } from '../prisma.service'
import { AnchievementType } from '@prisma/client'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaAchievementsRepository implements AchievementsRepository {
  constructor(private prisma: PrismaService) {}
  async findAnchievementToUnlock(
    type: AnchievementType,
    progressValue: number,
  ) {
    const achievement = await this.prisma.achievement.findFirst({
      where: {
        type,
        goal: {
          lte: progressValue,
        },
      },
    })

    if (!achievement) return null

    return PrismaAchievementsMapper.toDomain(achievement)
  }
}
