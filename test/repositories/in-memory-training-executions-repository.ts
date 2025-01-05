import { TrainingExecutionsRepository } from '@/domain/progress-tracking/applications/repositories/training-executions-repository'
import { TrainingExecutionFeedback } from '@/domain/progress-tracking/enterprise/entities/training-execution-feedback'

export class InMemoryTrainingExecutionsRepository implements TrainingExecutionsRepository {
  public items: TrainingExecutionFeedback[] = []

  async findById(id: string) {
    const trainingExecutionFeedback = this.items.find((item) => item.id.toString() == id)

    if (!trainingExecutionFeedback) {
      return null
    }

    return trainingExecutionFeedback
  }

  async create(trainingExecutionFeedback: TrainingExecutionFeedback) {
    this.items.push(trainingExecutionFeedback)
  }

  async save(trainingExecution: TrainingExecutionFeedback) {
    const itemIndex = this.items.findIndex((item) => item.id === trainingExecution.id)
    this.items[itemIndex] = trainingExecution
  }

}
