import { Either, right } from '@/core/either'
import {
  TrainingFeedbacksRepository,
  TrainingFrequency,
} from '../repositories/training-feedbacks-repository'
import { Injectable } from '@nestjs/common'

interface FetchTrainingFrequencyUseCaseRequest {
  studentId: string
}

type FetchTrainingFrequencyUseCaseResponse = Either<
  null,
  { frequencyTraining: TrainingFrequency[] }
>
@Injectable()
export class FetchTrainingFrequencyUseCase {
  constructor(private trainingFeedbacks: TrainingFeedbacksRepository) {}
  async execute({
    studentId,
  }: FetchTrainingFrequencyUseCaseRequest): Promise<FetchTrainingFrequencyUseCaseResponse> {
    const frequencyTraining =
      await this.trainingFeedbacks.findTrainingFrequencyByUserId(studentId)

    return right({ frequencyTraining })
  }
}
