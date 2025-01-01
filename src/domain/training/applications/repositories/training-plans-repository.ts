import { TrainingPlan } from '../../enterprise/entities/training-plan'

export interface TrainingPlansRepository {
  create(trainingPlan: TrainingPlan): Promise<void>
}
