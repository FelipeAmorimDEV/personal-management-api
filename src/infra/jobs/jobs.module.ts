import { Module } from '@nestjs/common'
import { UpdateExpiredPlansJob } from './updated-expired-plans.job'
import { UpdateExpiredPlansUseCase } from '@/domain/training/applications/use-cases/update-expired-plans'
import { DatabaseModule } from '../database/database.module'

@Module({
  imports: [DatabaseModule],
  providers: [UpdateExpiredPlansJob, UpdateExpiredPlansUseCase],
  exports: [UpdateExpiredPlansJob, UpdateExpiredPlansUseCase],
})
export class JobsModule {}
