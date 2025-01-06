import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt-strategy'
import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { CreateTrainingExecutionFeedbackUseCase } from '@/domain/progress-tracking/applications/use-cases/create-training-feedback'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'

const exerciseSchema = z.object({
  exerciseId: z.string().uuid(),
  weightUsed: z.coerce.number(),
})

const createTrainingFeedbackBodySchema = z.object({
  trainingId: z.string().uuid(),
  rate: z.coerce.number().min(1).max(5),
  comment: z.string(),
  exercises: z.array(exerciseSchema),
})

type CreateTrainingFeedbackBodySchema = z.infer<
  typeof createTrainingFeedbackBodySchema
>

const zodValidationPipe = new ZodValidationPipe(
  createTrainingFeedbackBodySchema,
)

@Controller('trainings/feedback')
export class CreateTrainingFeedbackController {
  constructor(
    private createTrainingFeedback: CreateTrainingExecutionFeedbackUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async handle(
    @Body(zodValidationPipe) body: CreateTrainingFeedbackBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { trainingId, rate, comment, exercises } = body
    const userId = user.sub

    await this.createTrainingFeedback.execute({
      studentId: userId,
      trainingId,
      rate,
      comment,
      exercises,
    })
  }
}
