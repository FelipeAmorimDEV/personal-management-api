import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  TrainingFeedback,
  TrainingFeedbackProps,
} from '@/domain/progress-tracking/enterprise/entities/training-feedback'

export function makeTrainingFeedback(
  override: Partial<TrainingFeedbackProps>,
  id?: UniqueEntityID,
) {
  const trainingExecutionFeedback = TrainingFeedback.create(
    {
      trainingId: new UniqueEntityID('training-1'),
      comment: 'Novo comentario',
      rate: 5,
      ...override,
    },
    id,
  )

  return trainingExecutionFeedback
}
