import { StudentAchievementsRepository } from '@/domain/progress-tracking/applications/repositories/student-achievements-repository'
import { PrismaService } from '../prisma.service'
import { StudentAchievement } from '@/domain/progress-tracking/enterprise/entities/student-achievement'
import { PrismaStudentAchievementMapper } from '../mappers/prisma-student-achievement-mapper'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaStudentAchievementsRepository
  implements StudentAchievementsRepository
{
  constructor(private prisma: PrismaService) {}

  async findStudentAchievement(userId: string, anchievementId: string) {
    const studentAchievement = await this.prisma.studentAchievement.findFirst({
      where: {
        studentId: userId,
        achievementId: anchievementId,
      },
    })

    if (!studentAchievement) return null

    return PrismaStudentAchievementMapper.toDomain(studentAchievement)
  }

  async createStudentAchievement(studentAchievement: StudentAchievement) {
    const data = PrismaStudentAchievementMapper.toPrisma(studentAchievement)
    await this.prisma.studentAchievement.create({
      data,
    })
  }
}
