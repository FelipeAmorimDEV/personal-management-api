import { Either, right } from '@/core/either'
import { TrainingFeedback } from '../../enterprise/entities/training-feedback'
import { TrainingFeedbacksRepository } from '../repositories/training-feedbacks-repository'

import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { Injectable } from '@nestjs/common'

interface FetchRecentTrainingFeedbackUseCaseRequest {
  userId: string
}

type FetchRecentTrainingFeedbackUseCaseResponse = Either<
  NotAllowedError,
  { trainingFeedbacks: TrainingFeedback[] }
>

@Injectable()
export class FetchRecentTrainingFeedbackUseCase {
  constructor(private trainingFeedbacks: TrainingFeedbacksRepository) {}

  async execute({
    userId,
  }: FetchRecentTrainingFeedbackUseCaseRequest): Promise<FetchRecentTrainingFeedbackUseCaseResponse> {
    const trainingFeedbacks =
      await this.trainingFeedbacks.findManyByUserId(userId)

    return right({ trainingFeedbacks })
  }
}
