import { Entity } from '../../../../core/entities/entities'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import { Optional } from '../../../../core/types/optional'
import { TrainingPlanStatus } from '../../applications/use-cases/enums/plan-status'

export enum TrainingStrategy {
  FIXED_DAYS = 'FIXED_DAYS',
  FLEXIBLE_SESSIONS = 'FLEXIBLE_SESSIONS',
}

export interface TrainingPlanProps {
  studentId: UniqueEntityID
  name: string
  goal: string
  trainingLevel: string
  sessionsPerWeek: number
  startDate: Date
  endDate: Date
  strategy: 'FIXED_DAYS' | 'FLEXIBLE_SESSIONS'
  status: TrainingPlanStatus
  createdAt: Date
  updatedAt?: Date
}

export class TrainingPlan extends Entity<TrainingPlanProps> {
  get studentId() {
    return this.props.studentId
  }

  get name() {
    return this.props.name
  }

  get goal() {
    return this.props.goal
  }

  get trainingLevel() {
    return this.props.trainingLevel
  }

  get sessionsPerWeek() {
    return this.props.sessionsPerWeek
  }

  get startDate() {
    return this.props.startDate
  }

  get endDate() {
    return this.props.endDate
  }

  get strategy() {
    return this.props.strategy
  }

  get status() {
    return this.props.status
  }

  set status(status: TrainingPlanStatus) {
    this.props.status = status
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(
    props: Optional<TrainingPlanProps, 'createdAt' | 'status'>,
    id?: UniqueEntityID,
  ) {
    const trainingPlan = new TrainingPlan(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        status: props.status ?? TrainingPlanStatus.ACTIVE,
      },
      id,
    )

    return trainingPlan
  }
}
