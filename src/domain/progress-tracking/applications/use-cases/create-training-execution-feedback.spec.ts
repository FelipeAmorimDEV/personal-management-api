import { InMemoryTrainingExecutionsRepository } from 'test/repositories/in-memory-training-executions-repository'
import { CreateTrainingExecutionFeedbackUseCase } from './create-training-feedback'
import { InMemoryReplyTrainingFeedbackRepository } from 'test/repositories/in-memory-reply-training-feedback-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { InMemoryTrainingsRepository } from 'test/repositories/in-memory-trainings-repository'
import { UnlockAchievementUseCase } from './unlock-achievement'
import { InMemoryAchievementsRepository } from 'test/repositories/in-memory-achievements-repository'
import { InMemoryStudentAchievementsRepository } from 'test/repositories/in-memory-student-achievements-repository'
import { IntensityLevel } from './enums/intensity-level'
import { makeTrainingFeedback } from 'test/factories/make-training-execution'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryStudentExercisesRepository } from 'test/repositories/in-memory-student-exercises-repository'
import { InMemoryExercisesRepository } from 'test/repositories/in-memory-exercises-repository'
import { InMemoryExerciseExecutionsRepository } from 'test/repositories/in-memory-exercise-executions-repository'

let inMemoryTrainingExecutionsRepository: InMemoryTrainingExecutionsRepository
let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryTrainingsRepository: InMemoryTrainingsRepository
let inMemoryReplyTrainingFeedbackRepository: InMemoryReplyTrainingFeedbackRepository
let inMemoryAchievementsRepository: InMemoryAchievementsRepository
let inMemoryStudentAchievementsRepository: InMemoryStudentAchievementsRepository
let inMemoryStudentExercisesRepository: InMemoryStudentExercisesRepository
let inMemoryExercisesRepository: InMemoryExercisesRepository
let inMemoryExerciseExecutionsRepository: InMemoryExerciseExecutionsRepository
let unlockAchievement: UnlockAchievementUseCase
let sut: CreateTrainingExecutionFeedbackUseCase

describe('Create Training Execution Feedback', () => {
  beforeEach(() => {
    inMemoryExercisesRepository = new InMemoryExercisesRepository()
    inMemoryExerciseExecutionsRepository =
      new InMemoryExerciseExecutionsRepository(inMemoryExercisesRepository)

    inMemoryStudentExercisesRepository = new InMemoryStudentExercisesRepository(
      inMemoryExercisesRepository,
    )
    inMemoryAchievementsRepository = new InMemoryAchievementsRepository()
    inMemoryStudentAchievementsRepository =
      new InMemoryStudentAchievementsRepository()
    unlockAchievement = new UnlockAchievementUseCase(
      inMemoryAchievementsRepository,
      inMemoryStudentAchievementsRepository,
    )
    inMemoryReplyTrainingFeedbackRepository =
      new InMemoryReplyTrainingFeedbackRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryTrainingsRepository = new InMemoryTrainingsRepository()
    inMemoryTrainingExecutionsRepository =
      new InMemoryTrainingExecutionsRepository(
        inMemoryReplyTrainingFeedbackRepository,
        inMemoryUsersRepository,
        inMemoryTrainingsRepository,
        inMemoryStudentExercisesRepository,
      )
    sut = new CreateTrainingExecutionFeedbackUseCase(
      inMemoryTrainingExecutionsRepository,
      unlockAchievement,
      inMemoryExerciseExecutionsRepository,
    )
  })

  it('should be able to create a training execution feedbacks', async () => {
    const result = await sut.execute({
      studentId: 'student-1',
      trainingId: 'training-1',
      comment: 'Achei facil',
      intensity: IntensityLevel.EXTREME,
      exercises: [
        {
          exerciseId: 'exercise-1',
          weightUsed: 20,
        },
        {
          exerciseId: 'exercise-2',
          weightUsed: 10,
        },
      ],
      finishedExercises: [
        {
          id: 'exercise-1',
          sets: 3,
          repetitions: 10,
        },
        {
          id: 'exercise-2',
          sets: 3,
          repetitions: 10,
        },
      ],
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryTrainingExecutionsRepository.items[0]).toEqual(
      expect.objectContaining({
        comment: 'Achei facil',
      }),
    )
  })

  it('should be able to unlock a achievement when finish training', async () => {
    const feedback = makeTrainingFeedback({
      studentId: new UniqueEntityID('student-1'),
      trainingId: new UniqueEntityID('training-1'),
    })
    inMemoryTrainingExecutionsRepository.create(feedback)

    const result = await sut.execute({
      studentId: 'student-1',
      trainingId: 'training-1',
      comment: 'Achei facil',
      intensity: IntensityLevel.EXTREME,
      exercises: [
        {
          exerciseId: 'exercise-1',
          weightUsed: 20,
        },
        {
          exerciseId: 'exercise-2',
          weightUsed: 10,
        },
      ],
      finishedExercises: [
        {
          id: 'exercise-1',
          sets: 3,
          repetitions: 10,
        },
        {
          id: 'exercise-2',
          sets: 3,
          repetitions: 10,
        },
      ],
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryStudentAchievementsRepository.items).toHaveLength(1)
  })
})
