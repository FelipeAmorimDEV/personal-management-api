import { FetchBodyCompositionUseCase } from '@/domain/progress-tracking/applications/use-cases/fetch-body-composition'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { UserPayload } from '@/infra/auth/jwt-strategy'
import { Controller, Get, UseGuards } from '@nestjs/common'
import { HttpBodyCompositionPresenter } from '../presenters/http-body-composition-presenter'

@Controller('body-composition')
@UseGuards(JwtAuthGuard)
export class FetchBodyCompositionController {
  constructor(private fetchBodyComposition: FetchBodyCompositionUseCase) {}
  @Get()
  async handle(@CurrentUser() user: UserPayload) {
    const studentId = user.sub
    const result = await this.fetchBodyComposition.execute({
      studentId,
    })

    if (result.isLeft()) {
      return null
    }

    return {
      BodyComposition: result.value.bodyCompositions.map(
        HttpBodyCompositionPresenter.toHTTP,
      ),
    }
  }
}
