import { DomainEvents } from '@/core/events/domain-events'
import { PaginationParams } from '@/core/types/pagination-params'
import { ReplyTrainingFeedbacksRepository } from '@/domain/progress-tracking/applications/repositories/reply-training-feedbacks-repository'
import { TrainingFeedbacksRepository } from '@/domain/progress-tracking/applications/repositories/training-feedbacks-repository'
import { TrainingFeedback } from '@/domain/progress-tracking/enterprise/entities/training-feedback'
import { getDatesOfWeek } from '@/utils/get-dates-of-week'

export class InMemoryTrainingExecutionsRepository
  implements TrainingFeedbacksRepository
{
  constructor(
    private replyTrainingFeedback: ReplyTrainingFeedbacksRepository,
  ) {}

  public items: TrainingFeedback[] = []

  async findTrainingFrequencyByUserId(userId: string) {
    // const frequencyTraining: TrainingFrequency[] = []

    const today = new Date()
    const datesOfWeek = getDatesOfWeek(today.toUTCString())

    const frequencyTraining = datesOfWeek.map((dates) => {
      const hasTraining = this.items.find(
        (item) =>
          item.studentId.toString() === userId &&
          item.createdAt.getDate() === dates.getDate(),
      )
      return {
        day: dates.getDay(),
        isTraining: !!hasTraining,
        isInvalid: !!(
          !hasTraining === true && dates.getDate() < today.getDate()
        ),
      }
    })

    return frequencyTraining
  }

  async findMany({ page }: PaginationParams) {
    return this.items.slice((page - 1) * 20, 20 * page)
  }

  async findManyByUserId(id: string) {
    const trainingFeedbacks = this.items.filter(
      (item) => item.studentId.toString() === id,
    )

    // Para cada feedback, aguardamos a busca pela resposta correspondente
    const trainingFeedbackWithResponse = await Promise.all(
      trainingFeedbacks.map(async (trainingFeedback) => {
        try {
          const data = await this.replyTrainingFeedback.findByFeedbackId(
            trainingFeedback.id.toString(),
          )

          if (data) {
            trainingFeedback.personalAnswer = {
              id: data.id.toString(),
              reply: data.reply,
            }
          }
        } catch (error) {
          console.error(
            `Erro ao buscar resposta para feedback ${trainingFeedback.id}:`,
            error,
          )
        }

        return trainingFeedback
      }),
    )

    return trainingFeedbackWithResponse
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
