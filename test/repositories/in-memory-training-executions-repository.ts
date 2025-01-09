import { DomainEvents } from '@/core/events/domain-events'
import { PaginationParams } from '@/core/types/pagination-params'
import { TrainingFeedbacksRepository } from '@/domain/progress-tracking/applications/repositories/training-feedbacks-repository'
import { TrainingFeedback } from '@/domain/progress-tracking/enterprise/entities/training-feedback'

export class InMemoryTrainingExecutionsRepository
  implements TrainingFeedbacksRepository
{
  public items: TrainingFeedback[] = []

  async findMany({ page }: PaginationParams) {
    return this.items.slice((page - 1) * 20, 20 * page)
  }

  async findManyByUserId(id: string) {
    const trainingFeedbacks = this.items.filter(
      (item) => item.studentId.toString() === id,
    )

    return trainingFeedbacks ?? null
  }

  async findById(id: string) {
    const trainingExecutionFeedback = this.items.find(
      (item) => item.id.toString() === id,
    )

    if (!trainingExecutionFeedback) {
      return null
    }

    return trainingExecutionFeedback
  }

  async create(trainingExecutionFeedback: TrainingFeedback) {
    this.items.push(trainingExecutionFeedback)
    DomainEvents.dispatchEventsForAggregate(trainingExecutionFeedback.id)
  }

  async save(trainingExecution: TrainingFeedback) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === trainingExecution.id,
    )
    this.items[itemIndex] = trainingExecution
  }
}
