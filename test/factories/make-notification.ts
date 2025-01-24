import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Notification,
  NotificationProps,
} from '@/domain/notification/enterprise/entities/notification'

export function makeNotification(
  override: Partial<NotificationProps>,
  id?: UniqueEntityID,
) {
  const notification = Notification.create(
    {
      recipientId: new UniqueEntityID('student-1'),
      title: 'O Professor Ricardo respondeu o seu feedback.',
      content: 'Continue assim...',
      ...override,
    },
    id,
  )

  return notification
}
