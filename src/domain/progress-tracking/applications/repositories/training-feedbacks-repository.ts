import { PaginationParams } from '@/core/types/pagination-params'
import { TrainingFeedback } from '../../enterprise/entities/training-feedback'

export abstract class TrainingFeedbacksRepository {
  abstract findMany({ page }: PaginationParams): Promise<TrainingFeedback[]>
  abstract findManyByUserId(id: string): Promise<TrainingFeedback[]>
  abstract findById(id: string): Promise<TrainingFeedback | null>
  abstract create(trainingExecution: TrainingFeedback): Promise<void>
  abstract save(trainingExecution: TrainingFeedback): Promise<void>
}
