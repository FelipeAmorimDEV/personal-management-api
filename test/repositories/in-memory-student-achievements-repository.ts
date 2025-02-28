import { StudentAchievementsRepository } from '@/domain/progress-tracking/applications/repositories/student-achievements-repository'
import { StudentAchievement } from '@/domain/progress-tracking/enterprise/entities/student-achievement'

export class InMemoryStudentAchievementsRepository
  implements StudentAchievementsRepository
{
  public items: StudentAchievement[] = []

  async findStudentAchievement(userId: string, anchievementId: string) {
    const studentAchievement = this.items.find(
      (item) =>
        item.studentId.toString() === userId &&
        item.achievementId.toString() === anchievementId,
    )

    if (!studentAchievement) {
      return null
    }

    return studentAchievement
  }

  async createStudentAchievement(studentAchievement: StudentAchievement) {
    this.items.push(studentAchievement)
  }
}
