import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { IntensityLevel } from '@/domain/progress-tracking/applications/use-cases/enums/intensity-level'
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
      studentId: new UniqueEntityID('student-1'),
      intensity: IntensityLevel.LOW,
      ...override,
    },
    id,
  )

  return trainingExecutionFeedback
}
