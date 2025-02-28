import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Achievement } from '@/domain/progress-tracking/enterprise/entities/achievement'
import { Prisma, Achievement as PrismaAchievement } from '@prisma/client'

export class PrismaAchievementsMapper {
  static toDomain(raw: PrismaAchievement): Achievement {
    return Achievement.create(
      {
        name: raw.name,
        description: raw.description,
        type: raw.type,
        goal: raw.goal,
        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(
    achievement: Achievement,
  ): Prisma.AchievementUncheckedCreateInput {
    return {
      id: achievement.id.toString(),
      name: achievement.name,
      description: achievement.description,
      type: achievement.type,
      goal: achievement.goal,
      createdAt: achievement.createdAt,
    }
  }
}
