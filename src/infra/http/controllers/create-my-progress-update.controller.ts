import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt-strategy'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { CreateMyProgressUpdateUseCase } from '@/domain/progress-tracking/applications/use-cases/create-my-progress-update'

const createMyProgressUpdateBodySchema = z.object({
  photo: z.string(),
  comment: z.string(),
})

type CreateMyProgressUpdateBodySchema = z.infer<
  typeof createMyProgressUpdateBodySchema
>

const zodValidationPipe = new ZodValidationPipe(
  createMyProgressUpdateBodySchema,
)

@Controller('my-progress')
@UseGuards(JwtAuthGuard)
export class CreateMyProgressUpdateController {
  constructor(private createMyProgressUpdate: CreateMyProgressUpdateUseCase) {}

  @Post()
  async handle(
    @Body(zodValidationPipe) body: CreateMyProgressUpdateBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { photo, comment } = body
    const studentId = user.sub

    await this.createMyProgressUpdate.execute({
      studentId,
      photo,
      comment,
    })
  }
}
