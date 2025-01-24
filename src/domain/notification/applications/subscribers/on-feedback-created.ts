import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { SendNotificationUseCase } from '../use-cases/send-notification'
import { TrainingFeedbackCreatedEvent } from '@/domain/progress-tracking/enterprise/events/training-feedback-created-event'
import { UsersRepository } from '@/domain/identity-management/applications/repositories/users-repository'

export class OnFeedbackCreated implements EventHandler {
  constructor(
    private sendNotification: SendNotificationUseCase,
    private usersRepository: UsersRepository,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewFeedbackNotification.bind(this),
      TrainingFeedbackCreatedEvent.name,
    )
  }

  async sendNewFeedbackNotification({
    trainingFeedback,
  }: TrainingFeedbackCreatedEvent) {
    const student = await this.usersRepository.findById(
      trainingFeedback.studentId.toString(),
    )
    if (student) {
      await this.sendNotification.execute({
        recipientId: 'admin-1',
        title: `O aluno ${student.name} publicou um feedback.`,
        content: trainingFeedback.except() ?? 'sem conteúdo.',
      })
    }
  }
}
