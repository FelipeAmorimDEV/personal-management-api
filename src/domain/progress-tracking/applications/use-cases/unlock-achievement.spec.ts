import { InMemoryStudentAchievementsRepository } from 'test/repositories/in-memory-student-achievements-repository'
import { InMemoryAchievementsRepository } from 'test/repositories/in-memory-achievements-repository'
import { AchievementType, UnlockAchievementUseCase } from './unlock-achievement'

let inMemoryStudentAchievementsRepository: InMemoryStudentAchievementsRepository
let inMemoryAchievementsRepository: InMemoryAchievementsRepository
let sut: UnlockAchievementUseCase

describe('Unlock Achievement', () => {
  beforeEach(() => {
    inMemoryStudentAchievementsRepository =
      new InMemoryStudentAchievementsRepository()
    inMemoryAchievementsRepository = new InMemoryAchievementsRepository()

    sut = new UnlockAchievementUseCase(
      inMemoryAchievementsRepository,
      inMemoryStudentAchievementsRepository,
    )
  })

  it('should be able to unlock a achievement', async () => {
    await sut.execute({
      achievementType: AchievementType.TRAINING_COMPLETED,
      progressValue: 2,
      studentId: 'student-1',
    })

    expect(inMemoryStudentAchievementsRepository.items).toHaveLength(1)
  })
})
