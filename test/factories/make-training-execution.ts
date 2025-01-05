import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { TrainingExecutionFeedback, TrainingExecutionFeedbackProps } from '@/domain/progress-tracking/enterprise/entities/training-execution-feedback'


export function makeTrainingExecution(override: Partial<TrainingExecutionFeedbackProps>, id?: UniqueEntityID) {
  const trainingExecutionFeedback = TrainingExecutionFeedback.create(
    {
      trainingId: new UniqueEntityID('training-1'),
      comment: 'Novo comentario',
      rate: 5,
      ...override
    },
    id,
  )

  return trainingExecutionFeedback
}
