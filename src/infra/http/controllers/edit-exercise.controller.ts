import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import {
  Controller,
  Put,
  UseGuards,
  Body,
  Param,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { z } from 'zod'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt-strategy'
import { EditExerciseUseCase } from '@/domain/training/applications/use-cases/edit-exercise'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

const editExerciseBodySchema = z.object({
  name: z.string().optional(),
  videoUrl: z.string().url().optional(),
  description: z.string().optional(),
})

type EditExerciseBodySchema = z.infer<typeof editExerciseBodySchema>

const zodValidationPipe = new ZodValidationPipe(editExerciseBodySchema)

@Controller('exercises')
@UseGuards(JwtAuthGuard)
export class EditExerciseController {
  constructor(private editExercise: EditExerciseUseCase) {}
  @Put('/:id')
  async handle(
    @Body(zodValidationPipe) body: EditExerciseBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('id') id: string,
  ) {
    const { name, description, videoUrl } = body
    const userId = user.sub

    const result = await this.editExercise.execute({
      exerciseId: id,
      userId,
      name,
      description,
      videoUrl,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (result.value.constructor) {
        case NotAllowedError:
          throw new UnauthorizedException(error.message)
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
