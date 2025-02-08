import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  BodyComposition,
  BodyCompositionProps,
} from '@/domain/progress-tracking/enterprise/entities/body-composition'

export function makeBodyComposition(
  override: Partial<BodyCompositionProps>,
  id?: UniqueEntityID,
) {
  const bodyComposition = BodyComposition.create(
    {
      studentId: new UniqueEntityID('student-1'),
      height: 163,
      weight: 80,
      age: 29,
      gender: 'MALE',
      abdominal: 90,
      chest: 120,
      hip: 70,
      waist: 100,
      suprailiac: 80,
      thigh: 60,
      triceps: 22,
      methodName: 'Pullock 3 Dobras',
      bmi: 30,
      bodyDensity: 10,
      bodyFatPercentage: 30,
      leanMassPercentage: 30,
      fatMassKg: 30,
      leanMassKg: 30,
      waistHipRatio: 30,
      ...override,
    },
    id,
  )

  return bodyComposition
}
