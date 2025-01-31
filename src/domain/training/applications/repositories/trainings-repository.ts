import { Training } from '../../enterprise/entities/training'

export abstract class TrainingsRepository {
  abstract fetchManyByTrainingPlanIdWithGroupsMuscle(
    trainingPlanId: string,
  ): Promise<Training[]>

  abstract create(training: Training): Promise<void>
}
