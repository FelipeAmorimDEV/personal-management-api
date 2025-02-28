import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { UserPayload } from '@/infra/auth/jwt-strategy'
import { Controller, Get, UseGuards } from '@nestjs/common'
import { FetchWeightProgressUseCase } from '@/domain/progress-tracking/applications/use-cases/fetch-weight-progress'

@Controller('weight-progress')
@UseGuards(JwtAuthGuard)
export class FetchWeightProgressController {
  constructor(private fetchWeightProgress: FetchWeightProgressUseCase) {}
  @Get()
  async handle(@CurrentUser() user: UserPayload) {
    const studentId = user.sub

    const result = await this.fetchWeightProgress.execute({
      studentId,
    })

    if (result.isLeft()) {
      return null
    }

    return {
      exercises: result.value.exercises,
    }
  }
}
