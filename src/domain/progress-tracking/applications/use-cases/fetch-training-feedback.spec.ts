import { InMemoryTrainingExecutionsRepository } from 'test/repositories/in-memory-training-executions-repository'
import { FetchTrainingFeedbackUseCase } from './fetch-training-feedback'
import { UserAutorizationServiceImpl } from '@/domain/identity-management/applications/services/user-autorization-service'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { makeTrainingFeedback } from 'test/factories/make-training-execution'
import { makeAdmin } from 'test/factories/make-admin'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryReplyTrainingFeedbackRepository } from 'test/repositories/in-memory-reply-training-feedback-repository'
import { InMemoryTrainingsRepository } from 'test/repositories/in-memory-trainings-repository'
import { InMemoryStudentExercisesRepository } from 'test/repositories/in-memory-student-exercises-repository'
import { InMemoryExercisesRepository } from 'test/repositories/in-memory-exercises-repository'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryTrainingFeedbacksRepository: InMemoryTrainingExecutionsRepository
let inMemoryReplyTrainingFeedbackRepository: InMemoryReplyTrainingFeedbackRepository
let inMemoryTrainingsRepository: InMemoryTrainingsRepository
let inMemoryStudentExercisesRepository: InMemoryStudentExercisesRepository
let inMemoryExercisesRepository: InMemoryExercisesRepository
let userAutorizationService: UserAutorizationServiceImpl
let sut: FetchTrainingFeedbackUseCase

describe('Fetch Training Feedback', () => {
  beforeEach(() => {
    inMemoryExercisesRepository = new InMemoryExercisesRepository()
    inMemoryStudentExercisesRepository = new InMemoryStudentExercisesRepository(
      inMemoryExercisesRepository,
    )
    inMemoryTrainingsRepository = new InMemoryTrainingsRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryReplyTrainingFeedbackRepository =
      new InMemoryReplyTrainingFeedbackRepository()
    inMemoryTrainingFeedbacksRepository =
      new InMemoryTrainingExecutionsRepository(
        inMemoryReplyTrainingFeedbackRepository,
        inMemoryUsersRepository,
        inMemoryTrainingsRepository,
        inMemoryStudentExercisesRepository,
      )
    userAutorizationService = new UserAutorizationServiceImpl(
      inMemoryUsersRepository,
    )
    sut = new FetchTrainingFeedbackUseCase(
      inMemoryTrainingFeedbacksRepository,
      userAutorizationService,
    )
  })

  it('should be able to fetch training feedbacks', async () => {
    const admin = makeAdmin({}, new UniqueEntityID('admin-1'))
    inMemoryUsersRepository.create(admin)

    const trainingFeedback = makeTrainingFeedback({})
    inMemoryTrainingFeedbacksRepository.create(trainingFeedback)

    const result = await sut.execute({
      userId: 'admin-1',
      page: 1,
    })

    if (result.isRight()) {
      expect(result.value.trainingFeedbacks).toHaveLength(1)
    }
  })

  it('should be able to fetch training feedbacks paginated', async () => {
    const admin = makeAdmin({}, new UniqueEntityID('admin-1'))
    inMemoryUsersRepository.create(admin)

    for (let i = 0; i < 22; i++) {
      const trainingFeedback = makeTrainingFeedback({})
      inMemoryTrainingFeedbacksRepository.create(trainingFeedback)
    }

    const result = await sut.execute({
      userId: 'admin-1',
      page: 2,
    })

    if (result.isRight()) {
      expect(result.value.trainingFeedbacks).toHaveLength(2)
    }
  })
})
