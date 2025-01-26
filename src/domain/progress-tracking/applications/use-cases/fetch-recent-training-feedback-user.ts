import { Either, right } from '@/core/either'
import { TrainingFeedbacksRepository } from '../repositories/training-feedbacks-repository'

import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { Injectable } from '@nestjs/common'
import { TrainingFeedbackWithDetails } from '../../enterprise/entities/value-objects/training-feedback-with-details'

interface FetchRecentTrainingFeedbackUseCaseRequest {
  userId: string
}

type FetchRecentTrainingFeedbackUseCaseResponse = Either<
  NotAllowedError,
  { trainingFeedbacks: TrainingFeedbackWithDetails[] }
>

@Injectable()
export class FetchRecentTrainingFeedbackUseCase {
  constructor(private trainingFeedbacks: TrainingFeedbacksRepository) {}

  async execute({
    userId,
  }: FetchRecentTrainingFeedbackUseCaseRequest): Promise<FetchRecentTrainingFeedbackUseCaseResponse> {
    const trainingFeedbacks =
      await this.trainingFeedbacks.fetchManyByUserIdWithDetails(userId)

    return right({ trainingFeedbacks })
  }
}
