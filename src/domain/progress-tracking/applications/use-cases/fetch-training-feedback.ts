import { Either, left, right } from '@/core/either'
import { TrainingFeedback } from '../../enterprise/entities/training-feedback'
import { TrainingFeedbacksRepository } from '../repositories/training-feedbacks-repository'
import { UsersAutorizationService } from '../repositories/user-autorization-service'
import { NotAllowedError } from '@/core/errors/not-allowed-error'

interface FetchTrainingFeedbackUseCaseRequest {
  userId: string
  page: number
}

type FetchTrainingFeedbackUseCaseResponse = Either<
  NotAllowedError,
  { trainingFeedbacks: TrainingFeedback[] }
>

export class FetchTrainingFeedbackUseCase {
  constructor(
    private trainingFeedbacks: TrainingFeedbacksRepository,
    private userAutorizationService: UsersAutorizationService,
  ) {}

  async execute({
    userId,
    page,
  }: FetchTrainingFeedbackUseCaseRequest): Promise<FetchTrainingFeedbackUseCaseResponse> {
    const isAdmin = await this.userAutorizationService.isAdmin(userId)

    if (!isAdmin) {
      return left(new NotAllowedError())
    }
    const trainingFeedbacks = await this.trainingFeedbacks.findMany({ page })

    return right({ trainingFeedbacks })
  }
}
