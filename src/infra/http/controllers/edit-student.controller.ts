import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import {
  Controller,
  Put,
  UseGuards,
  Body,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { z } from 'zod'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt-strategy'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { EditStudentUseCase } from '@/domain/identity-management/applications/use-cases/edit-student'

const editStudentBodySchema = z.object({
  name: z.string(),
  password: z.string().optional(),
  old_password: z.string().optional(),
})

type EditStudentBodySchema = z.infer<typeof editStudentBodySchema>

const zodValidationPipe = new ZodValidationPipe(editStudentBodySchema)

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class EditStudentController {
  constructor(private editStudent: EditStudentUseCase) {}
  @Put()
  async handle(
    @Body(zodValidationPipe) body: EditStudentBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { name, password, old_password } = body
    const userId = user.sub

    const result = await this.editStudent.execute({
      studentId: userId,
      name,
      password,
      old_password,
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
