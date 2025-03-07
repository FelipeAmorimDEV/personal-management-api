import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  TrainingPlan,
  TrainingPlanProps,
} from '@/domain/training/enterprise/entities/training-plan'

export function makeTrainingPlan(
  override: Partial<TrainingPlanProps>,
  id?: UniqueEntityID,
) {
  const trainingPlan = TrainingPlan.create(
    {
      name: 'Training Plan',
      goal: 'Hipertrofia',
      sessionsPerWeek: 3,
      strategy: 'FLEXIBLE_SESSIONS',
      studentId: new UniqueEntityID('student-1'),
      startDate: new Date(2025, 1, 1),
      endDate: new Date(2025, 1, 3),
      trainingLevel: 'BEGINNER',
      ...override,
    },
    id,
  )

  return trainingPlan
}
