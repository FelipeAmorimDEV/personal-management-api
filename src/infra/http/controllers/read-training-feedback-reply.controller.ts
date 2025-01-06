import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { ReadReplyTrainingFeedbackUseCase } from '@/domain/progress-tracking/applications/use-cases/read-reply-training-feedback'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import {
  BadRequestException,
  Controller,
  NotFoundException,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common'

@Controller('trainings/feedbacks/reply/:id')
@UseGuards(JwtAuthGuard)
export class ReadTrainingFeedbackReplyController {
  constructor(
    private readTrainingFeedbackReply: ReadReplyTrainingFeedbackUseCase,
  ) {}

  @Put()
  async handle(@Param('id') trainingFeedbackReplyId: string) {
    const result = await this.readTrainingFeedbackReply.execute({
      replyTrainingFeedbackId: trainingFeedbackReplyId,
    })

    if (result.isLeft()) {
      const error = result.value
      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
