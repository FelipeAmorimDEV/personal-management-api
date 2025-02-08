import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Anamnesis,
  AnamnesisProps,
} from '@/domain/progress-tracking/enterprise/entities/anamnesis'

export function makeAnamnesis(
  override: Partial<AnamnesisProps>,
  id?: UniqueEntityID,
) {
  const anamnesis = Anamnesis.create(
    {
      studentId: new UniqueEntityID('student-1'),
      fullName: 'John Doe',
      age: 29,
      hadChestPainInLastMonth: false,
      hasBalanceProblems: true,
      hasBoneOrJointProblem: false,
      hasChestPainDuringActivity: true,
      hasHeartProblem: false,
      hasOtherHealthIssues: false,
      takesBloodPressureMedication: true,
      ...override,
    },
    id,
  )

  return anamnesis
}
