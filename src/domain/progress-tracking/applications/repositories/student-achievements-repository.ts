import { StudentAchievement } from '../../enterprise/entities/student-achievement'

export abstract class StudentAchievementsRepository {
  abstract findStudentAchievement(
    userId: string,
    anchievementId: string,
  ): Promise<StudentAchievement | null>

  abstract createStudentAchievement(
    studentAchievement: StudentAchievement,
  ): Promise<void>
}
