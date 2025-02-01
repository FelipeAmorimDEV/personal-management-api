import { Entity } from '@/core/entities/entities'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface BodyCompositionProps {
  studentId: UniqueEntityID
  methodName: string
  age: number
  height: number
  weight: number
  gender: 'MALE' | 'FEMALE'
  chest: number
  abdominal: number
  thigh: number
  triceps: number
  suprailiac: number
  bodyDensity: number
  bodyFatPercentage: number
  leanMassPercentage: number // Percentual de massa magra
  fatMassKg: number // Quantidade de gordura em kg
  leanMassKg: number // Quantidade de massa magra em kg
  bmi: number // Índice de Massa Corporal (IMC)
  waist: number // Circunferência da cintura (cm)
  hip: number // Circunferência do quadril (cm)
  waistHipRatio: number // Relação Cintura-Quadril (RCQ)
  createdAt: Date
  updatedAt?: Date | null
}

export class BodyComposition extends Entity<BodyCompositionProps> {
  get studentId() {
    return this.props.studentId
  }

  get methodName() {
    return this.props.methodName
  }

  get age() {
    return this.props.age
  }

  get height() {
    return this.props.height
  }

  get weight() {
    return this.props.weight
  }

  get gender() {
    return this.props.gender
  }

  get chest() {
    return this.props.chest
  }

  get abdominal() {
    return this.props.abdominal
  }

  get thigh() {
    return this.props.thigh
  }

  get triceps() {
    return this.props.triceps
  }

  get suprailiac() {
    return this.props.suprailiac
  }

  get bodyDensity() {
    return this.props.bodyDensity
  }

  get bodyFatPercentage() {
    return this.props.bodyFatPercentage
  }

  get leanMassPercentage() {
    return this.props.leanMassPercentage
  }

  get fatMassKg() {
    return this.props.fatMassKg
  }

  get leanMassKg() {
    return this.props.leanMassKg
  }

  get bmi() {
    return this.props.bmi
  }

  get waistHipRatio() {
    return this.props.waistHipRatio
  }

  get waist() {
    return this.props.waist
  }

  get hip() {
    return this.props.hip
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(
    props: Optional<BodyCompositionProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const bodyComposition = new BodyComposition(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return bodyComposition
  }
}
