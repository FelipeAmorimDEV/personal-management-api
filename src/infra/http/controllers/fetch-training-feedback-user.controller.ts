import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt-strategy'
import { Controller, Get, UseGuards } from '@nestjs/common'
import { HttpTrainingFeedbackPresenter } from '../presenters/http-training-feedback-presenter'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { FetchRecentTrainingFeedbackUseCase } from '@/domain/progress-tracking/applications/use-cases/fetch-recent-training-feedback-user'

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
      HttpTrainingFeedbackPresenter.toHTTP,
    )

    return { trainingFeedbacks }
  }
}
