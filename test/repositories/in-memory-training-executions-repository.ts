import { DomainEvents } from '@/core/events/domain-events'
import { PaginationParams } from '@/core/types/pagination-params'
import { TrainingFeedbacksRepository } from '@/domain/progress-tracking/applications/repositories/training-feedbacks-repository'
import { TrainingFeedback } from '@/domain/progress-tracking/enterprise/entities/training-feedback'
import { TrainingFeedbackWithDetails } from '@/domain/progress-tracking/enterprise/entities/value-objects/training-feedback-with-details'
import { getDatesOfWeek } from '@/utils/get-dates-of-week'
import { InMemoryReplyTrainingFeedbackRepository } from './in-memory-reply-training-feedback-repository'
import { InMemoryUsersRepository } from './in-memory-users-repository'
import { InMemoryTrainingsRepository } from './in-memory-trainings-repository'

export class InMemoryTrainingExecutionsRepository
  implements TrainingFeedbacksRepository
{
  constructor(
    private replyTrainingFeedback: InMemoryReplyTrainingFeedbackRepository,
    private usersRepository: InMemoryUsersRepository,
    private trainingsRepository: InMemoryTrainingsRepository,
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

    return trainingFeedbacks
  }

  async fetchManyByUserIdWithDetails(userId: string) {
    const trainingFeedbacks = this.items
      .filter((item) => item.studentId.toString() === userId)
      .map((trainingFeedback) => {
        const student = this.usersRepository.items.find(
          (user) => user.id === trainingFeedback.studentId,
        )
        const training = this.trainingsRepository.items.find(
          (training) => training.id === trainingFeedback.trainingId,
        )
        const answer = this.replyTrainingFeedback.items.find(
          (reply) => reply.trainingFeedbackId === trainingFeedback.id,
        )

        if (!student || !training || !answer) {
          throw new Error('Relacionamento não encontrado')
        }
        return TrainingFeedbackWithDetails.create({
          studentId: trainingFeedback.studentId,
          trainingFeedbackId: trainingFeedback.id,
          comment: trainingFeedback.comment,
          intensity: trainingFeedback.intensity,
          createdAt: trainingFeedback.createdAt,
          readAt: trainingFeedback.readAt,
          studentName: student.name,
          trainingName: training.name,
          personalAnswer: answer.reply,
        })
      })

    return trainingFeedbacks
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
