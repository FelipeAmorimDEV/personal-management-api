import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { FindAnamnesisUseCase } from '@/domain/progress-tracking/applications/use-cases/find-anamnesis'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common'
import { HttpAnamnesisPresenter } from '../presenters/http-anamnseis-presenter'

@Controller('anamnesis/:id')
@UseGuards(JwtAuthGuard)
export class FindAnamnesisController {
  constructor(private findAnamnesis: FindAnamnesisUseCase) {}

  @Get()
  async handle(@Param('id') id: string) {
    const result = await this.findAnamnesis.execute({
      anamnesisId: id,
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

    return { anamnesis: HttpAnamnesisPresenter.toHTTP(result.value.anamnesis) }
  }
}
