import { FetchTrainingPlanUseCase } from '@/domain/training/applications/use-cases/fetch-training-plan'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { UserPayload } from '@/infra/auth/jwt-strategy'
import { BadRequestException, Controller, Get, UseGuards } from '@nestjs/common'
import { HttpTrainingPlanPresenter } from '../presenters/http-training-plan-presenter'

@Controller('training-plans')
@UseGuards(JwtAuthGuard)
export class FetchTrainingPlanController {
  constructor(private fetchTrainingPlan: FetchTrainingPlanUseCase) {}

  @Get()
  async handle(@CurrentUser() user: UserPayload) {
    const studentId = user.sub

    const result = await this.fetchTrainingPlan.execute({
      studentId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const trainingPlans = result.value.trainingPlans.map(
      HttpTrainingPlanPresenter.toHTTP,
    )

    return { trainingPlans }
  }
}
