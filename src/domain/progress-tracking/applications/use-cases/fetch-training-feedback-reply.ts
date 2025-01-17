import { Either, right } from '@/core/either'
import { ReplyTrainingFeedbacksRepository } from '../repositories/reply-training-feedbacks-repository'
import { TrainingFeedbackReply } from '../../enterprise/entities/training-feedback-reply'
import { Injectable } from '@nestjs/common'

interface FetchTrainingFeedbackReplyUseCaseRequest {
  studentId: string
}

type FetchTrainingFeedbackReplyUseCaseResponse = Either<
  null,
  { feedbacksReplies: TrainingFeedbackReply[] }
>

@Injectable()
export class FetchTrainingFeedbackReplyUseCase {
  constructor(
    private trainingFeedbackReplies: ReplyTrainingFeedbacksRepository,
  ) {}

  async execute({
    studentId,
  }: FetchTrainingFeedbackReplyUseCaseRequest): Promise<FetchTrainingFeedbackReplyUseCaseResponse> {
    const trainingFeedbackReplies =
      await this.trainingFeedbackReplies.findRepliesForStudent(studentId)

    return right({ feedbacksReplies: trainingFeedbackReplies })
  }
}
