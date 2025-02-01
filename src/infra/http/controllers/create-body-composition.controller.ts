import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt-strategy'
import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { CreateBodyCompositionPollock3UseCase } from '@/domain/progress-tracking/applications/use-cases/create-body-composition-pullock-3'

const createBodyCompositionSchema = z.object({
  age: z.number(),
  height: z.number(),
  weight: z.number(),
  gender: z.enum(['MALE', 'FEMALE']),
  chest: z.number(),
  abdominal: z.number(),
  thigh: z.number(),
  triceps: z.number(),
  suprailiac: z.number(),
  hip: z.number(),
  waist: z.number(),
})

type CreateBodyCompositionSchema = z.infer<typeof createBodyCompositionSchema>

const zodValidationPipe = new ZodValidationPipe(createBodyCompositionSchema)

@Controller('body-composition')
@UseGuards(JwtAuthGuard)
export class CreateBodyCompositionController {
  constructor(
    private createBodyComposition: CreateBodyCompositionPollock3UseCase,
  ) {}

  @Post()
  async handle(
    @Body(zodValidationPipe) body: CreateBodyCompositionSchema,
    @CurrentUser() user: UserPayload,
  ) {
    const {
      abdominal,
      age,
      chest,
      gender,
      height,
      hip,
      suprailiac,
      thigh,
      triceps,
      waist,
      weight,
    } = body

    const studentId = user.sub

    await this.createBodyComposition.execute({
      studentId,
      abdominal,
      age,
      chest,
      gender,
      height,
      hip,
      suprailiac,
      thigh,
      triceps,
      waist,
      weight,
    })
  }
}
