import { InMemoryReplyTrainingFeedbackRepository } from 'test/repositories/in-memory-reply-training-feedback-repository'
import { ReplayTrainingFeedbackUseCase } from './reply-training-feedback'
import { InMemoryTrainingExecutionsRepository } from 'test/repositories/in-memory-training-executions-repository'
import { makeTrainingFeedback } from 'test/factories/make-training-execution'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { InMemoryTrainingsRepository } from 'test/repositories/in-memory-trainings-repository'
import { InMemoryStudentExercisesRepository } from 'test/repositories/in-memory-student-exercises-repository'
import { InMemoryExercisesRepository } from 'test/repositories/in-memory-exercises-repository'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryTrainingsRepository: InMemoryTrainingsRepository
let inMemoryStudentExercisesRepository: InMemoryStudentExercisesRepository
let inMemoryExercisesRepository: InMemoryExercisesRepository
let inMemoryTrainingFeedbacksRepository: InMemoryTrainingExecutionsRepository
let inMemoryReplyTrainingFeedbackRepository: InMemoryReplyTrainingFeedbackRepository
let sut: ReplayTrainingFeedbackUseCase

describe('Reply Training Feedback', () => {
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

    sut = new ReplayTrainingFeedbackUseCase(
      inMemoryTrainingFeedbacksRepository,
      inMemoryReplyTrainingFeedbackRepository,
    )
  })

  it('should be able to reply a training feedback', async () => {
    const trainingFeedback = makeTrainingFeedback(
      {},
      new UniqueEntityID('feedback-1'),
    )
    inMemoryTrainingFeedbacksRepository.create(trainingFeedback)

    const result = await sut.execute({
      feedbackId: 'feedback-1',
      reply: 'Continue assim.',
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryReplyTrainingFeedbackRepository.items[0].reply).toEqual(
      'Continue assim.',
    )
  })
})
