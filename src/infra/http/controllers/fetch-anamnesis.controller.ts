import { FetchAnamnesisUseCase } from '@/domain/progress-tracking/applications/use-cases/fetch-anamnesis'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { UserPayload } from '@/infra/auth/jwt-strategy'
import { Controller, Get, UseGuards } from '@nestjs/common'
import { HttpAnamnesisPresenter } from '../presenters/http-anamnseis-presenter'

@Controller('anamnesis')
@UseGuards(JwtAuthGuard)
export class FetchAnamnesisController {
  constructor(private fetchAnamnesis: FetchAnamnesisUseCase) {}
  @Get()
  async handle(@CurrentUser() user: UserPayload) {
    const studentId = user.sub

    const result = await this.fetchAnamnesis.execute({
      studentId,
    })

    if (result.isLeft()) {
      return null
    }

    return {
      anamnesis: result.value.anamnesis.map(HttpAnamnesisPresenter.toHTTP),
    }
  }
}
