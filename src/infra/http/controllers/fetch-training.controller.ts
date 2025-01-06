import { FetchTrainingPlanUseCase } from '@/domain/training/applications/use-cases/fetch-training-plan'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { UserPayload } from '@/infra/auth/jwt-strategy'
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common'
import { HttpTrainingPlanPresenter } from '../presenters/http-training-plan-presenter'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { FetchTrainingUseCase } from '@/domain/training/applications/use-cases/fetch-training'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { HttpTrainingPresenter } from '../presenters/http-training-presenter'

const fetchTrainingQuerySchema = z.object({
  trainingPlanId: z.string().uuid(),
})

type FetchTrainingQuerySchema = z.infer<typeof fetchTrainingQuerySchema>

const zodValidationPipe = new ZodValidationPipe(fetchTrainingQuerySchema)

@Controller('trainings')
@UseGuards(JwtAuthGuard)
export class FetchTrainingController {
  constructor(private fetchTraining: FetchTrainingUseCase) {}

  @Get()
  async handle(@Query(zodValidationPipe) query: FetchTrainingQuerySchema) {
    const result = await this.fetchTraining.execute({
      trainingPlanId: query.trainingPlanId,
    })

    if (result.isLeft()) {
      const error = result.value
      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    const training = result.value.trainings.map(HttpTrainingPresenter.toHTTP)

    return { training }
  }
}
