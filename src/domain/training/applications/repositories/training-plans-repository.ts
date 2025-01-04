import { TrainingPlan } from '../../enterprise/entities/training-plan'

export abstract class TrainingPlansRepository {
  abstract findById(trainingPlanId: string): Promise<TrainingPlan | null>
  abstract fetchManyByStudentId(studentId: string): Promise<TrainingPlan[]>
  abstract create(trainingPlan: TrainingPlan): Promise<void>
}
