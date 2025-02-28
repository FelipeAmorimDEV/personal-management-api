import { Injectable } from '@nestjs/common'
import { TrainingFeedbacksRepository } from '../repositories/training-feedbacks-repository'
import { NotificationService } from '@/infra/notification/notification.service'

@Injectable()
export class SendTrainingRemindersUseCase {
  constructor(
    private trainingFeedbacksRepository: TrainingFeedbacksRepository,
  ) {}

  async execute() {
    console.log('[Reminder] Verificando usuários sem treino há 7 dias...')

    const usersWithoutTraining =
      await this.trainingFeedbacksRepository.getUsersWithoutTrainingForDays(7)

    if (usersWithoutTraining.length === 0) {
      console.log('[Reminder] Nenhum usuário precisa de notificação.')
      return
    }

    for (const user of usersWithoutTraining) {
      console.log(`[Reminder] Enviando notificação para ${user.id}...`)

      await NotificationService.sendPushNotification(
        user.id.toString(),
        'Seu progresso importa! 💪',
        'Já fazem 7 dias desde seu último treino. Vamos voltar à rotina?',
      )
    }

    console.log(
      `[Reminder] Notificações enviadas para ${usersWithoutTraining.length} usuários.`,
    )
  }
}
