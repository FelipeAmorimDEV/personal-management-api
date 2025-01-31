import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt-strategy'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { CreateMyProgressAnswerUseCase } from '@/domain/progress-tracking/applications/use-cases/create-my-progress-answer'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/not-allowed-error'

const createMyProgressAnswerBodySchema = z.object({
  reply: z.string(),
})

type CreateMyProgressAnswerBodySchema = z.infer<
  typeof createMyProgressAnswerBodySchema
>

const zodValidationPipe = new ZodValidationPipe(
  createMyProgressAnswerBodySchema,
)

@Controller('my-progress/:id/answer')
@UseGuards(JwtAuthGuard)
export class CreateMyProgressAnswerController {
  constructor(private createMyProgressAnswer: CreateMyProgressAnswerUseCase) {}

  @Post()
  async handle(
    @Body(zodValidationPipe) body: CreateMyProgressAnswerBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('id') progressId: string,
  ) {
    const { reply } = body
    const userId = user.sub

    const result = await this.createMyProgressAnswer.execute({
      userId,
      progressId,
      reply,
    })

    if (result.isLeft()) {
      const error = result.value
      switch (error.constructor) {
        case ResourceNotFoundError:
          return new NotFoundException(error.message)
        case NotAllowedError:
          return new ConflictException(error.message)
        default:
          return new BadRequestException(error.message)
      }
    }
  }
}
