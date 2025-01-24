import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { UserPayload } from '@/infra/auth/jwt-strategy'
import { Controller, Get, UseGuards } from '@nestjs/common'
import { FetchTrainingFrequencyUseCase } from '@/domain/progress-tracking/applications/use-cases/fetch-training-frequency'
import { HttpTrainingFrequencyPresenter } from '../presenters/http-training-frequency'

@Controller('trainings/frequency')
export class FetchTrainingFrequencyController {
  constructor(private fetchTrainingFrequency: FetchTrainingFrequencyUseCase) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async handle(@CurrentUser() user: UserPayload) {
    const studentId = user.sub

    const result = await this.fetchTrainingFrequency.execute({
      studentId,
    })

    if (result.isLeft()) {
      return null
    }

    return {
      trainingFrequency: result.value.frequencyTraining.map(
        HttpTrainingFrequencyPresenter.toHTTP,
      ),
    }
  }
}
