import { FetchTrainingFeedbackReplyUseCase } from '@/domain/progress-tracking/applications/use-cases/fetch-training-feedback-reply'
import { Controller, Get, UseGuards } from '@nestjs/common'
import { HttpFeedbackReplyPresenter } from '../presenters/http-feedback-reply-presenter'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt-strategy'

@Controller('trainings/replies')
@UseGuards(JwtAuthGuard)
export class FetchRecentTrainingFeedbackRepliesController {
  constructor(
    private fetchTrainingFeedbackReplies: FetchTrainingFeedbackReplyUseCase,
  ) {}

  @Get()
  async handle(@CurrentUser() user: UserPayload) {
    const studentId = user.sub

    const result = await this.fetchTrainingFeedbackReplies.execute({
      studentId,
    })

    if (result.isLeft()) {
      return null
    }

    return {
      feedbacksReply: result.value.feedbacksReplies.map(
        HttpFeedbackReplyPresenter.toHTTP,
      ),
    }
  }
}
