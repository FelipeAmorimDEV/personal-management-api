import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'
import { SendNotificationUseCase } from '../use-cases/send-notification'
import { InMemoryTrainingExecutionsRepository } from 'test/repositories/in-memory-training-executions-repository'
import { MockInstance } from 'vitest'
import { waitFor } from 'test/utils/wait-for'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { OnFeedbackReplied } from './on-feedback-replied'
import { TrainingFeedbackReply } from '@/domain/progress-tracking/enterprise/entities/training-feedback-reply'
import { InMemoryReplyTrainingFeedbackRepository } from 'test/repositories/in-memory-reply-training-feedback-repository'
import { makeTrainingFeedback } from 'test/factories/make-training-execution'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { InMemoryTrainingsRepository } from 'test/repositories/in-memory-trainings-repository'
import { InMemoryStudentExercisesRepository } from 'test/repositories/in-memory-student-exercises-repository'
import { InMemoryExercisesRepository } from 'test/repositories/in-memory-exercises-repository'

let sendNotificationUseCase: SendNotificationUseCase
let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryTrainingsRepository: InMemoryTrainingsRepository
let inMemoryStudentExercisesRepository: InMemoryStudentExercisesRepository
let inMemoryExercisesRepository: InMemoryExercisesRepository
let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let inMemoryTrainingFeedbackRepliesRepository: InMemoryReplyTrainingFeedbackRepository
let inMemoryTrainingFeedbacksRepository: InMemoryTrainingExecutionsRepository
let callbackNotification: MockInstance
describe('On Feedback Replied', () => {
  beforeEach(async () => {
    inMemoryExercisesRepository = new InMemoryExercisesRepository()
    inMemoryStudentExercisesRepository = new InMemoryStudentExercisesRepository(
      inMemoryExercisesRepository,
    )
    inMemoryTrainingsRepository = new InMemoryTrainingsRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryTrainingFeedbackRepliesRepository =
      new InMemoryReplyTrainingFeedbackRepository()
    inMemoryTrainingFeedbacksRepository =
      new InMemoryTrainingExecutionsRepository(
        inMemoryTrainingFeedbackRepliesRepository,
        inMemoryUsersRepository,
        inMemoryTrainingsRepository,
        inMemoryStudentExercisesRepository,
      )
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationsRepository,
    )

    callbackNotification = vi.spyOn(sendNotificationUseCase, 'execute')

    new OnFeedbackReplied(
      sendNotificationUseCase,
      inMemoryTrainingFeedbacksRepository,
    )
  })
  it('should send a notification when a feedback is replied', async () => {
    const trainingFeedback = makeTrainingFeedback(
      {},
      new UniqueEntityID('training-1'),
    )
    const trainingFeedbackReply = TrainingFeedbackReply.create({
      trainingFeedbackId: new UniqueEntityID('training-1'),
      reply: 'bom treino',
    })
    inMemoryTrainingFeedbacksRepository.create(trainingFeedback)
    inMemoryTrainingFeedbackRepliesRepository.create(trainingFeedbackReply)

    await waitFor(() => {
      expect(callbackNotification).toBeCalled()
    })
  })
})
