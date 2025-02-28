import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { StudentAchievement } from '@/domain/progress-tracking/enterprise/entities/student-achievement'
import {
  Prisma,
  StudentAchievement as PrismaStudentAchievement,
} from '@prisma/client'

export class PrismaStudentAchievementMapper {
  static toDomain(raw: PrismaStudentAchievement): StudentAchievement {
    return StudentAchievement.create(
      {
        studentId: new UniqueEntityID(raw.studentId),
        achievementId: new UniqueEntityID(raw.achievementId),
        unlockedAt: raw.unlockedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(
    studentAchievement: StudentAchievement,
  ): Prisma.StudentAchievementUncheckedCreateInput {
    return {
      id: studentAchievement.id.toString(),
      studentId: studentAchievement.studentId.toString(),
      achievementId: studentAchievement.achievementId.toString(),
      unlockedAt: studentAchievement.unlockedAt,
    }
  }
}
