import { FetchTrainingFeedbackUseCase } from '@/domain/progress-tracking/applications/use-cases/fetch-training-feedback'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt-strategy'
import {
  BadRequestException,
  Controller,
  Get,
  Query,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'
import { HttpTrainingFeedbackPresenter } from '../presenters/http-training-feedback-presenter'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { NotAllowedError } from '@/core/errors/not-allowed-error'

@Controller('trainings/feedback')
@UseGuards(JwtAuthGuard)
export class FetchTrainingFeedbackController {
  constructor(private fetchTrainingFeedback: FetchTrainingFeedbackUseCase) {}
  @Get()
  async handle(@Query('page') page: number, @CurrentUser() user: UserPayload) {
    const userId = user.sub

    const result = await this.fetchTrainingFeedback.execute({
      userId,
      page,
    })

    if (result.isLeft()) {
      const error = result.value
      switch (error.constructor) {
        case NotAllowedError:
          throw new UnauthorizedException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    const trainingFeedbacks = result.value.trainingFeedbacks.map(
      HttpTrainingFeedbackPresenter.toHTTP,
    )

    return { trainingFeedbacks }
  }
}
