import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { CreateTrainingUseCase } from '@/domain/training/applications/use-cases/create-training'
import { DayOfWeek } from '@/domain/training/enterprise/entities/training'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { UserPayload } from '@/infra/auth/jwt-strategy'
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

const exercisesSchema = z.object({
  exerciseId: z.string().uuid(),
  sets: z.coerce.number(),
  repetitions: z.coerce.number(),
  restTime: z.coerce.number(),
})

const groupMuscleSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
})

const createTrainingBodySchema = z.object({
  name: z.string(),
  type: z.enum(['DAY', 'SESSION']),
  exercises: z.array(exercisesSchema),
  trainingPlanId: z.string().uuid(),
  dayOfWeek: z.nativeEnum(DayOfWeek).optional(),
  groupMuscle: z.array(groupMuscleSchema),
})

type CreateTrainingBodySchema = z.infer<typeof createTrainingBodySchema>

const zodValidationPipe = new ZodValidationPipe(createTrainingBodySchema)

@Controller('trainings')
@UseGuards(JwtAuthGuard)
export class CreateTrainingController {
  constructor(private createTraining: CreateTrainingUseCase) {}

  @Post()
  async handle(
    @Body(zodValidationPipe) body: CreateTrainingBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { trainingPlanId, name, type, exercises, dayOfWeek, groupMuscle } =
      body
    const userId = user.sub

    const result = await this.createTraining.execute({
      userId,
      trainingPlanId,
      name,
      type,
      exercises,
      dayOfWeek,
      groupMuscle,
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
