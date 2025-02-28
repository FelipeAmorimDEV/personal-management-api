import { SendTrainingRemindersUseCase } from '@/domain/progress-tracking/applications/use-cases/send-training-reminders'
import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'

@Injectable()
export class SendNotificationUsersWithoutTrainingJob {
  private logger = new Logger(SendNotificationUsersWithoutTrainingJob.name)

  constructor(private sendTrainingReminders: SendTrainingRemindersUseCase) {}

  // Executa todos os dias à meia-noite
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    this.logger.log('Verificando os usuarios que não treinam a 7 dias..')

    try {
      await this.sendTrainingReminders.execute()
      this.logger.log('Notificação enviada com sucesso!')
    } catch (error) {
      this.logger.error('Erro ao enviar notificaçãoes:', error)
    }
  }
}
