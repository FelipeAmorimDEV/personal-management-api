import { Module } from '@nestjs/common'
import { UpdateExpiredPlansJob } from './updated-expired-plans.job'
import { UpdateExpiredPlansUseCase } from '@/domain/training/applications/use-cases/update-expired-plans'
import { DatabaseModule } from '../database/database.module'
import { SendNotificationUsersWithoutTrainingJob } from './send-notification-users-without-training.job'
import { SendTrainingRemindersUseCase } from '@/domain/progress-tracking/applications/use-cases/send-training-reminders'

@Module({
  imports: [DatabaseModule],
  providers: [
    UpdateExpiredPlansJob,
    UpdateExpiredPlansUseCase,
    SendTrainingRemindersUseCase,
    SendNotificationUsersWithoutTrainingJob,
  ],
}) // FIX REMOVE EXPORTS
export class JobsModule {}
