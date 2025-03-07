import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'
import { SendNotificationUseCase } from '../use-cases/send-notification'
import { OnFeedbackCreated } from './on-feedback-created'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { makeTrainingFeedback } from 'test/factories/make-training-execution'
import { InMemoryTrainingExecutionsRepository } from 'test/repositories/in-memory-training-executions-repository'
import { MockInstance } from 'vitest'
import { waitFor } from 'test/utils/wait-for'
import { makeStudent } from 'test/factories/make-student'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryReplyTrainingFeedbackRepository } from 'test/repositories/in-memory-reply-training-feedback-repository'
import { InMemoryTrainingsRepository } from 'test/repositories/in-memory-trainings-repository'
import { InMemoryStudentExercisesRepository } from 'test/repositories/in-memory-student-exercises-repository'
import { InMemoryExercisesRepository } from 'test/repositories/in-memory-exercises-repository'

let sendNotificationUseCase: SendNotificationUseCase
let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let inMemoryReplyTrainingFeedbackRepository: InMemoryReplyTrainingFeedbackRepository
let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryTrainingsRepository: InMemoryTrainingsRepository
let inMemoryExercisesRepository: InMemoryExercisesRepository
let inMemoryStudentExercisesRepository: InMemoryStudentExercisesRepository
let inMemoryTrainingFeedbacksRepository: InMemoryTrainingExecutionsRepository
let callbackNotification: MockInstance
describe('On Feedback Created', () => {
  beforeEach(async () => {
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

    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationsRepository,
    )

    callbackNotification = vi.spyOn(sendNotificationUseCase, 'execute')

    new OnFeedbackCreated(sendNotificationUseCase, inMemoryUsersRepository)
  })
  it('should send a notification when a feedback is created', async () => {
    const student = makeStudent({}, new UniqueEntityID('student-1'))
    const trainingFeedback = makeTrainingFeedback({
      studentId: student.id,
    })
    inMemoryUsersRepository.create(student)
    inMemoryTrainingFeedbacksRepository.create(trainingFeedback)

    await waitFor(() => {
      expect(callbackNotification).toBeCalled()
    })
  })
})
