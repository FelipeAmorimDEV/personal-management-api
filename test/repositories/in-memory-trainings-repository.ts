import { TrainingsRepository } from '@/domain/training/applications/repositories/trainings-repository'
import { Training } from '@/domain/training/enterprise/entities/training'

export class InMemoryTrainingsRepository implements TrainingsRepository {
  public items: Training[] = []

  async fetchManyByTrainingPlanId(trainingPlanId: string) {
    const trainings = this.items.filter(
      (item) => item.trainingPlanId.toString() === trainingPlanId,
    )
    return trainings
  }

  async create(training: Training) {
    this.items.push(training)
  }
}
