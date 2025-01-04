import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Training, TrainingProps } from '@/domain/training/enterprise/entities/training'


export function makeTraining(override: Partial<TrainingProps>, id?: UniqueEntityID) {
  const training = Training.create(
    {
      name: 'TREINO A',
      trainingPlanId: new UniqueEntityID('training-plan-1'),
      type: 'SESSION',
      ...override
    },
    id,
  )

  return training
}
