import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt-strategy'
import { Controller, Get, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { FetchRecentTrainingFeedbackUseCase } from '@/domain/progress-tracking/applications/use-cases/fetch-recent-training-feedback-user'
import { HttpTrainingFeedbackWithDetailsPresenter } from '../presenters/http-training-feedback-with-details-presenter'

@Controller('trainings/feedback/user') // FIX
@UseGuards(JwtAuthGuard)
export class FetchRecentTrainingFeedbackController {
  constructor(
    private fetchRecentTrainingFeedBackUser: FetchRecentTrainingFeedbackUseCase,
  ) {}

  @Get()
  async handle(@CurrentUser() user: UserPayload) {
    const userId = user.sub

    const result = await this.fetchRecentTrainingFeedBackUser.execute({
      userId,
    })

    if (result.isLeft()) {
      return { trainingFeedbacks: [] }
    }

    const trainingFeedbacks = result.value.trainingFeedbacks.map(
      HttpTrainingFeedbackWithDetailsPresenter.toHTTP,
    )

    return { trainingFeedbacks }
  }
}
