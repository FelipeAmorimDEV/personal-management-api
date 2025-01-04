import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt-strategy'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { CreateExerciseUseCase } from '@/domain/training/applications/use-cases/create-exercise'
import { NotAllowedError } from '@/core/errors/not-allowed-error'

const createExerciseBodySchema = z.object({
  videoUrl: z.string().url(),
  name: z.string(),
  description: z.string(),
})

type CreateExerciseBodySchema = z.infer<typeof createExerciseBodySchema>

const zodValidationPipe = new ZodValidationPipe(createExerciseBodySchema)

@Controller('exercises')
@UseGuards(JwtAuthGuard)
export class CreateExerciseController {
  constructor(private createExercise: CreateExerciseUseCase) {}

  @Post()
  async handle(
    @Body(zodValidationPipe) body: CreateExerciseBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { videoUrl, name, description } = body

    const result = await this.createExercise.execute({
      userId: user.sub,
      name,
      videoUrl,
      description,
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
  }
}
