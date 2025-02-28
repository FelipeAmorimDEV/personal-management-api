import { AchievementsRepository } from '../repositories/achievements-repository'
import { StudentAchievementsRepository } from '../repositories/student-achievements-repository'
import { StudentAchievement } from '../../enterprise/entities/student-achievement'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Injectable } from '@nestjs/common'
import { NotificationService } from '@/infra/notification/notification.service'

export enum AchievementType {
  TRAINING_COMPLETED = 'TRAINING_COMPLETED',
  STREAK_DAYS = 'STREAK_DAYS',
  WEIGHT_LIFTED = 'WEIGHT_LIFTED',
  FEEDBACK_GIVEN = 'FEEDBACK_GIVEN',
}

interface UnlockAchievementUseCaseRequest {
  studentId: string
  achievementType: AchievementType
  progressValue: number
}

@Injectable()
export class UnlockAchievementUseCase {
  constructor(
    private achievements: AchievementsRepository,
    private studentAchievements: StudentAchievementsRepository,
  ) {}

  async execute({
    progressValue,
    studentId,
    achievementType,
  }: UnlockAchievementUseCaseRequest) {
    const achievement = await this.achievements.findAnchievementToUnlock(
      achievementType,
      progressValue,
    )

    if (!achievement) return

    const alreadyUnlocked =
      await this.studentAchievements.findStudentAchievement(
        studentId,
        achievement.id.toString(),
      )

    if (!alreadyUnlocked) {
      const studentAchievement = StudentAchievement.create({
        studentId: new UniqueEntityID(studentId),
        achievementId: achievement.id,
      })

      await this.studentAchievements.createStudentAchievement(
        studentAchievement,
      )

      console.log('StudentID', studentId)
      await NotificationService.sendPushNotification(
        studentId,
        achievement.name,
        achievement.description,
      )
    }
  }
}
