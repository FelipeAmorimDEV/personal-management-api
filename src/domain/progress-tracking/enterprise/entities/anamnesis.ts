import { Entity } from '@/core/entities/entities'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface AnamnesisProps {
  studentId: UniqueEntityID
  fullName: string
  age: number
  hasHeartProblem: boolean
  hasChestPainDuringActivity: boolean
  hadChestPainInLastMonth: boolean
  hasBalanceProblems: boolean
  hasBoneOrJointProblem: boolean
  takesBloodPressureMedication: boolean
  hasOtherHealthIssues: boolean
  createdAt: Date
  updatedAt?: Date | null
}

export class Anamnesis extends Entity<AnamnesisProps> {
  get studentId() {
    return this.props.studentId
  }

  get fullName() {
    return this.props.fullName
  }

  get age() {
    return this.props.age
  }

  get hasHeartProblem() {
    return this.props.hasHeartProblem
  }

  get hasChestPainDuringActivity() {
    return this.props.hasChestPainDuringActivity
  }

  get hadChestPainInLastMonth() {
    return this.props.hadChestPainInLastMonth
  }

  get hasBalanceProblems() {
    return this.props.hasBalanceProblems
  }

  get hasBoneOrJointProblem() {
    return this.props.hasBoneOrJointProblem
  }

  get takesBloodPressureMedication() {
    return this.props.takesBloodPressureMedication
  }

  get hasOtherHealthIssues() {
    return this.props.hasOtherHealthIssues
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(
    props: Optional<AnamnesisProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const anamnesis = new Anamnesis(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return anamnesis
  }
}
