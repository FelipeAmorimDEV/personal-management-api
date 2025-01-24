import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'
import { ReadNotificationUseCase } from './read-notification'
import { makeNotification } from 'test/factories/make-notification'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sut: ReadNotificationUseCase

describe('Send Notification', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sut = new ReadNotificationUseCase(inMemoryNotificationsRepository)
  })

  it('should be able to read a notification', async () => {
    const notification = makeNotification(
      {},
      new UniqueEntityID('notification-1'),
    )

    inMemoryNotificationsRepository.create(notification)

    const result = await sut.execute({
      recipientId: 'student-1',
      notificationId: 'notification-1',
    })

    expect(result.isRight())
    expect(inMemoryNotificationsRepository.items[0].readAt).toEqual(
      expect.any(Date),
    )
  })

  it('should not be able to read a notification from another user', async () => {
    const notification = makeNotification(
      {
        recipientId: new UniqueEntityID('student-1'),
      },
      new UniqueEntityID('notification-1'),
    )

    inMemoryNotificationsRepository.create(notification)

    const result = await sut.execute({
      recipientId: 'student-2',
      notificationId: 'notification-1',
    })

    expect(result.isLeft())
    expect(inMemoryNotificationsRepository.items[0].readAt).toBeFalsy()
  })
})
