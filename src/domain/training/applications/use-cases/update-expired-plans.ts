import { Injectable } from '@nestjs/common'
import { TrainingPlansRepository } from '../repositories/training-plans-repository'

@Injectable()
export class UpdateExpiredPlansUseCase {
  constructor(private trainingplansRepository: TrainingPlansRepository) {}

  async execute() {
    await this.trainingplansRepository.updatedExpiredPlans()
  }
}
