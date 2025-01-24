import { EventHandler } from '@/core/events/event-handler'

import { SendNotificationUseCase } from '../use-cases/send-notification'
import { TrainingFeedbacksRepository } from '@/domain/progress-tracking/applications/repositories/training-feedbacks-repository'
import { DomainEvents } from '@/core/events/domain-events'
import { TrainingFeedbackReplyCreatedEvent } from '@/domain/progress-tracking/enterprise/events/training-feedback-reply-created-event'

export class OnFeedbackReplied implements EventHandler {
  constructor(
    private sendNotification: SendNotificationUseCase,
    private trainingFeedbacksRepository: TrainingFeedbacksRepository,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewFeedbackReplyNotification.bind(this),
      TrainingFeedbackReplyCreatedEvent.name,
    )
  }

  async sendNewFeedbackReplyNotification({
    trainingFeedbackReply,
  }: TrainingFeedbackReplyCreatedEvent) {
    const trainingFeedback = await this.trainingFeedbacksRepository.findById(
      trainingFeedbackReply.trainingFeedbackId.toString(),
    )

    if (trainingFeedback) {
      const studentId = trainingFeedback.studentId.toString()

      await this.sendNotification.execute({
        recipientId: studentId,
        title: 'O professor Felipe respondeu o seu feedback!',
        content: trainingFeedbackReply.except(),
      })
    }
  }
}
