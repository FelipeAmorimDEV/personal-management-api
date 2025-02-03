import { UpdateExpiredPlansUseCase } from '@/domain/training/applications/use-cases/update-expired-plans'
import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'

@Injectable()
export class UpdateExpiredPlansJob {
  private logger = new Logger(UpdateExpiredPlansJob.name)

  constructor(private updateExpiredPlansUseCase: UpdateExpiredPlansUseCase) {}

  // Executa todos os dias à meia-noite
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    this.logger.log('Verificando planos expirados...')

    try {
      await this.updateExpiredPlansUseCase.execute()
      this.logger.log('Planos expirados atualizados com sucesso!')
    } catch (error) {
      this.logger.error('Erro ao atualizar planos expirados:', error)
    }
  }
}
