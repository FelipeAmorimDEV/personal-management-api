import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt-strategy'
import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { CreateTrainingExecutionFeedbackUseCase } from '@/domain/progress-tracking/applications/use-cases/create-training-feedback'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { IntensityLevel } from '@/domain/progress-tracking/applications/use-cases/enums/intensity-level'

const exerciseSchema = z.object({
  exerciseId: z.string().uuid(),
  weightUsed: z.coerce.number(),
})

const finishedExerciseSchema = z.object({
  id: z.string().uuid(),
  sets: z.coerce.number(),
  repetitions: z.coerce.number(),
})

const createTrainingFeedbackBodySchema = z.object({
  trainingId: z.string().uuid(),
  intensity: z.enum([
    IntensityLevel.VERY_LOW,
    IntensityLevel.LOW,
    IntensityLevel.MODERATE,
    IntensityLevel.HIGH,
    IntensityLevel.EXTREME,
  ]),
  comment: z.string(),
  exercises: z.array(exerciseSchema),
  finishedExercises: z.array(finishedExerciseSchema),
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
    const { trainingId, intensity, comment, exercises, finishedExercises } =
      body
    const userId = user.sub

    await this.createTrainingFeedback.execute({
      studentId: userId,
      trainingId,
      intensity,
      comment,
      exercises,
      finishedExercises,
    })
  }
}
