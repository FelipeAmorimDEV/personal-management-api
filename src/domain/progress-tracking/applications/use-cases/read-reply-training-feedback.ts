import { Injectable } from '@nestjs/common'
import { TrainingFeedbackReply } from '../../enterprise/entities/training-feedback-reply'
import { ReplyTrainingFeedbacksRepository } from '../repositories/reply-training-feedbacks-repository'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

interface ReadReplyTrainingFeedbackUseCaseRequest {
  replyTrainingFeedbackId: string
}

type ReadReplyTrainingFeedbackUseCaseResponse = Either<
  ResourceNotFoundError,
  { trainingFeedbackReply: TrainingFeedbackReply }
>

@Injectable()
export class ReadReplyTrainingFeedbackUseCase {
  constructor(
    private replayTrainingFeedbacks: ReplyTrainingFeedbacksRepository,
  ) {}

  async execute({
    replyTrainingFeedbackId,
  }: ReadReplyTrainingFeedbackUseCaseRequest): Promise<ReadReplyTrainingFeedbackUseCaseResponse> {
    const trainingFeedbackReply = await this.replayTrainingFeedbacks.findById(
      replyTrainingFeedbackId,
    )

    if (!trainingFeedbackReply) {
      return left(new ResourceNotFoundError())
    }

    trainingFeedbackReply.readFeedback()

    await this.replayTrainingFeedbacks.save(trainingFeedbackReply)

    return right({ trainingFeedbackReply })
  }
}
