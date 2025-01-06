import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { TrainingFeedbackReply } from '../../enterprise/entities/training-feedback-reply'
import { ReplyTrainingFeedbacksRepository } from '../repositories/reply-training-feedbacks-repository'
import { Either, left, right } from '@/core/either'
import { TrainingFeedbacksRepository } from '../repositories/training-feedbacks-repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import { FeedbackAlreadyRepliedError } from './errors/feedback-already-reply'

interface ReplayTrainingFeedbackUseCaseRequest {
  feedbackId: string
  reply: string
}

type ReplayTrainingFeedbackUseCaseResponse = Either<
  ResourceNotFoundError,
  { trainingFeedbackReply: TrainingFeedbackReply }
>

@Injectable()
export class ReplayTrainingFeedbackUseCase {
  constructor(
    private trainingFeedbacksRepository: TrainingFeedbacksRepository,
    private replayTrainingFeedbacks: ReplyTrainingFeedbacksRepository,
  ) {}

  async execute({
    feedbackId,
    reply,
  }: ReplayTrainingFeedbackUseCaseRequest): Promise<ReplayTrainingFeedbackUseCaseResponse> {
    const feedback = await this.trainingFeedbacksRepository.findById(feedbackId)

    if (!feedback) {
      return left(new ResourceNotFoundError())
    }
    if (feedback.readAt) {
      return left(new FeedbackAlreadyRepliedError())
    }

    const trainingFeedbackReply = TrainingFeedbackReply.create({
      trainingFeedbackId: new UniqueEntityID(feedbackId),
      reply,
    })

    feedback.readFeedback()

    await this.replayTrainingFeedbacks.create(trainingFeedbackReply)
    await this.trainingFeedbacksRepository.save(feedback)

    return right({ trainingFeedbackReply })
  }
}
