import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { UserPayload } from '@/infra/auth/jwt-strategy'
import {
  BadRequestException,
  Controller,
  Post,
  UnauthorizedException,
  UseGuards,
  Body,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { CreateTrainingPlanUseCase } from '@/domain/training/applications/use-cases/create-training-plan'
import { NotAllowedError } from '@/core/errors/not-allowed-error'

const createTrainingPlanBodySchema = z.object({
  studentId: z.string().uuid(),
  name: z.string(),
  goal: z.string(),
  sessionsPerWeek: z.coerce.number(),
  strategy: z.enum(['FIXED_DAYS', 'FLEXIBLE_SESSIONS']),
  startDate: z.string().date(),
  endDate: z.string().date(),
})

type CreateTraingPlanBodySchema = z.infer<typeof createTrainingPlanBodySchema>

const zodValidationPipe = new ZodValidationPipe(createTrainingPlanBodySchema)

@Controller('training-plans')
@UseGuards(JwtAuthGuard)
export class CreateTrainingPlanController {
  constructor(private createTrainingPlan: CreateTrainingPlanUseCase) {}

  @Post()
  async handle(
    @Body(zodValidationPipe) body: CreateTraingPlanBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const {
      name,
      goal,
      sessionsPerWeek,
      strategy,
      startDate,
      endDate,
      studentId,
    } = body
    const userId = user.sub

    const result = await this.createTrainingPlan.execute({
      userId,
      studentId,
      name,
      goal,
      sessionsPerWeek,
      strategy,
      startDate,
      endDate,
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
