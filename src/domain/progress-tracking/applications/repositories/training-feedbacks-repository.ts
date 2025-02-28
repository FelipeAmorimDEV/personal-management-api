import { PaginationParams } from '@/core/types/pagination-params'
import { TrainingFeedback } from '../../enterprise/entities/training-feedback'
import { TrainingFeedbackWithDetails } from '../../enterprise/entities/value-objects/training-feedback-with-details'
import { StudentExercise } from '@/domain/training/enterprise/entities/student-exercise'
import { Student } from '@/domain/identity-management/enterprise/entities/student'

export interface TrainingFrequency {
  day: number
  isTraining: boolean | null
  isInvalid: boolean
}

export abstract class TrainingFeedbacksRepository {
  abstract getUsersWithoutTrainingForDays(days: number): Promise<Student[]>
  abstract getTotalWeightLifted(studentId: string): Promise<number>
  abstract updateTotalWeightLifted(
    studentId: string,
    totalWeightLifted: number,
  ): Promise<void>

  abstract getExerciseDetails(
    exerciseId: string,
  ): Promise<StudentExercise | null>

  abstract getTrainingCount(studentId: string): Promise<number>
  abstract findMany({ page }: PaginationParams): Promise<TrainingFeedback[]>
  abstract findManyByUserId(id: string): Promise<TrainingFeedback[]>
  abstract fetchManyByUserIdWithDetails(
    userId: string,
  ): Promise<TrainingFeedbackWithDetails[]>

  abstract findTrainingFrequencyByUserId(
    userId: string,
  ): Promise<TrainingFrequency[]>

  abstract findById(id: string): Promise<TrainingFeedback | null>
  abstract create(trainingExecution: TrainingFeedback): Promise<void>
  abstract save(trainingExecution: TrainingFeedback): Promise<void>
}
