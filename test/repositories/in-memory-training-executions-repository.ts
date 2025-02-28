import { DomainEvents } from '@/core/events/domain-events'
import { PaginationParams } from '@/core/types/pagination-params'
import { TrainingFeedbacksRepository } from '@/domain/progress-tracking/applications/repositories/training-feedbacks-repository'
import { TrainingFeedback } from '@/domain/progress-tracking/enterprise/entities/training-feedback'
import { TrainingFeedbackWithDetails } from '@/domain/progress-tracking/enterprise/entities/value-objects/training-feedback-with-details'
import { getDatesOfWeek } from '@/utils/get-dates-of-week'
import { InMemoryReplyTrainingFeedbackRepository } from './in-memory-reply-training-feedback-repository'
import { InMemoryUsersRepository } from './in-memory-users-repository'
import { InMemoryTrainingsRepository } from './in-memory-trainings-repository'
import { StudentExercise } from '@/domain/training/enterprise/entities/student-exercise'
import { WeightLifted } from '@/domain/progress-tracking/enterprise/entities/weight-lifted'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryStudentExercisesRepository } from './in-memory-student-exercises-repository'
import { Student } from '@/domain/identity-management/enterprise/entities/student'

export class InMemoryTrainingExecutionsRepository
  implements TrainingFeedbacksRepository
{
  constructor(
    private replyTrainingFeedback: InMemoryReplyTrainingFeedbackRepository,
    private usersRepository: InMemoryUsersRepository,
    private trainingsRepository: InMemoryTrainingsRepository,
    private studentExercisesRepository: InMemoryStudentExercisesRepository,
  ) {}

  public items: TrainingFeedback[] = []
  public weightLifted: WeightLifted[] = []

  async getUsersWithoutTrainingForDays(days: number): Promise<Student[]> {
    const daysAgo = new Date()
    daysAgo.setDate(daysAgo.getDate() - days)

    // Filtra os usuários que não realizaram treinos nos últimos X dias
    const usersWithoutTraining: Student[] = []

    for (const feedback of this.items) {
      // Encontrar o usuário associado ao feedback
      const user = this.usersRepository.items.find(
        (user) => user.id.toString() === feedback.studentId.toString(),
      )

      if (!user) {
        continue
      }

      // Verificar o último treino do usuário
      const lastTrainingFeedback = this.items
        .filter((item) => item.studentId.toString() === user.id.toString())
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0]

      // Se o último treino foi feito antes de 'X' dias, adiciona o usuário na lista
      if (!lastTrainingFeedback || lastTrainingFeedback.createdAt < daysAgo) {
        usersWithoutTraining.push(user)
      }
    }

    return usersWithoutTraining
  }

  async getTotalWeightLifted(studentId: string): Promise<number> {
    const weightLifted = this.weightLifted.find(
      (weight) => weight.studentId.toString() === studentId,
    )

    if (!weightLifted) {
      return 0
    }

    return weightLifted.weightLifted
  }

  async updateTotalWeightLifted(
    studentId: string,
    totalWeightLifted: number,
  ): Promise<void> {
    const weightLifted = this.weightLifted.find(
      (weight) => weight.studentId.toString() === studentId,
    )

    if (weightLifted) {
      weightLifted.weightLifted = totalWeightLifted
    } else {
      this.weightLifted.push(
        WeightLifted.create({
          studentId: new UniqueEntityID(studentId),
          weightLifted: totalWeightLifted,
        }),
      )
    }
  }

  async getExerciseDetails(
    exerciseId: string,
  ): Promise<StudentExercise | null> {
    const exerciseDetails = this.studentExercisesRepository.items.find(
      (exercise) => exercise.exerciseId.toString() === exerciseId,
    )

    if (!exerciseDetails) {
      return null
    }
    return exerciseDetails
  }

  async getTrainingCount(studentId: string): Promise<number> {
    const trainingFeedback = this.items.filter(
      (item) => item.studentId.toString() === studentId,
    )

    return trainingFeedback.length
  }

  async findTrainingFrequencyByUserId(userId: string) {
    // const frequencyTraining: TrainingFrequency[] = []

    const today = new Date()
    const datesOfWeek = getDatesOfWeek(today.toUTCString())

    const frequencyTraining = datesOfWeek.map((dates) => {
      const hasTraining = this.items.find((item) => {
        return (
          item.studentId.toString() === userId &&
          item.createdAt.getDate() === dates.getDate()
        )
      })
      return {
        day: dates.getDay(),
        isTraining: !!hasTraining,
        isInvalid: !hasTraining && dates.getDay() < today.getDay(),
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
