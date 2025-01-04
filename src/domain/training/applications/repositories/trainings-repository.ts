import { Training } from '../../enterprise/entities/training'

export abstract class TrainingsRepository {
  abstract fetchManyByTrainingPlanId(trainingPlanId: string): Promise<Training[]>
  abstract create(training: Training): Promise<void>
}
