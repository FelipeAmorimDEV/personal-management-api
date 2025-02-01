import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { FindBodyCompositionUseCase } from '@/domain/progress-tracking/applications/use-cases/find-body-composition'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { HttpBodyCompositionPresenter } from '../presenters/http-body-composition-presenter'
import { HttpBodyCompositionWithDetailsPresenter } from '../presenters/http-body-composition-with-details-presenter'

const paramsSchema = z.object({
  id: z.string().uuid(),
})

type ParamsSchema = z.infer<typeof paramsSchema>

const zodValidationPipe = new ZodValidationPipe(paramsSchema)

@Controller('body-composition/:id')
export class FindBodyCompositionController {
  constructor(private findBodyComposition: FindBodyCompositionUseCase) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async handle(@Param(zodValidationPipe) params: ParamsSchema) {
    const { id } = params

    const result = await this.findBodyComposition.execute({
      assessmentId: id,
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

    return {
      bodyComposition: HttpBodyCompositionWithDetailsPresenter.toHTTP(
        result.value.bodyComposition,
      ),
    }
  }
}
