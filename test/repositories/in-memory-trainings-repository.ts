import { TrainingsRepository } from '@/domain/training/applications/repositories/trainings-repository'
import { Training } from '@/domain/training/enterprise/entities/training'

export class InMemoryTrainingsRepository implements TrainingsRepository {
  public items: Training[] = []

  async create(training: Training) {
    this.items.push(training)
  }
}
