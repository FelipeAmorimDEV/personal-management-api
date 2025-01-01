import { Training } from '../../enterprise/entities/training'

export interface TrainingsRepository {
  create(training: Training): Promise<void>
}
