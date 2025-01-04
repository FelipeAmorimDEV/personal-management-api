import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import {
  Controller,
  UseGuards,
  Param,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
  Delete,
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt-strategy'
import { DeleteExerciseUseCase } from '@/domain/training/applications/use-cases/delete-exercise'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

@Controller('exercises/:id')
@UseGuards(JwtAuthGuard)
export class DeleteExerciseController {
  constructor(private deleteExercise: DeleteExerciseUseCase) {}
  @Delete()
  async handle(@CurrentUser() user: UserPayload, @Param('id') id: string) {
    const userId = user.sub

    const result = await this.deleteExercise.execute({
      userId,
      exerciseId: id,
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
