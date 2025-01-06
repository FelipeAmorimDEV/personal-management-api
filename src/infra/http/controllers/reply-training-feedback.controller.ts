import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { ReplayTrainingFeedbackUseCase } from '@/domain/progress-tracking/applications/use-cases/reply-training-feedback'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { FeedbackAlreadyRepliedError } from '@/domain/progress-tracking/applications/use-cases/errors/feedback-already-reply'

const replyTrainingFeedbackBodySchema = z.object({
  reply: z.string(),
})

type ReplyTrainingFeedbackBodySchema = z.infer<
  typeof replyTrainingFeedbackBodySchema
>

const zodValidationPipe = new ZodValidationPipe(replyTrainingFeedbackBodySchema)

@Controller('trainings/feedback/:id/reply')
export class ReplyTrainingFeedbackController {
  constructor(private replyTrainingFeedback: ReplayTrainingFeedbackUseCase) {}
  @Post()
  async handle(
    @Body(zodValidationPipe) body: ReplyTrainingFeedbackBodySchema,
    @Param('id') id: string,
  ) {
    const { reply } = body

    const result = await this.replyTrainingFeedback.execute({
      feedbackId: id,
      reply,
    })

    if (result.isLeft()) {
      const error = result.value
      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        case FeedbackAlreadyRepliedError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
