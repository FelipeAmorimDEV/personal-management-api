import { PaginationParams } from '@/core/types/pagination-params'
import { TrainingFeedback } from '../../enterprise/entities/training-feedback'

export interface TrainingFrequency {
  day: number
  isTraining: boolean | null
  isInvalid: boolean
}

export abstract class TrainingFeedbacksRepository {
  abstract findMany({ page }: PaginationParams): Promise<TrainingFeedback[]>
  abstract findManyByUserId(id: string): Promise<TrainingFeedback[]>
  abstract findTrainingFrequencyByUserId(
    userId: string,
  ): Promise<TrainingFrequency[]>

  abstract findById(id: string): Promise<TrainingFeedback | null>
  abstract create(trainingExecution: TrainingFeedback): Promise<void>
  abstract save(trainingExecution: TrainingFeedback): Promise<void>
}
