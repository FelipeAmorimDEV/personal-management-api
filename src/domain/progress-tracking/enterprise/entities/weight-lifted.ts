import { Entity } from '@/core/entities/entities'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface WeightLiftedProps {
  studentId: UniqueEntityID
  weightLifted: number
}

export class WeightLifted extends Entity<WeightLiftedProps> {
  get studentId() {
    return this.props.studentId
  }

  get weightLifted() {
    return this.props.weightLifted
  }

  set weightLifted(weightLifted: number) {
    this.props.weightLifted = weightLifted
  }

  static create(props: WeightLiftedProps, id?: UniqueEntityID) {
    const weightLifted = new WeightLifted(
      {
        ...props,
      },
      id,
    )

    return weightLifted
  }
}
