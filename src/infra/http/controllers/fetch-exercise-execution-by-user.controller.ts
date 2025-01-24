import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { UserPayload } from '@/infra/auth/jwt-strategy'
import { Controller, Get, UseGuards } from '@nestjs/common'
import { HttpExerciseExecutionPresenter } from '../presenters/http-exercise-execution'
import { FetchExerciseExecutionByUserUseCase } from '@/domain/progress-tracking/applications/use-cases/fetch-exercise-execution-by-user'

@Controller('exercises/executions')
export class FetchExerciseExecutionByUserController {
  constructor(
    private fetchExerciseExecutionsByUser: FetchExerciseExecutionByUserUseCase,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async handle(@CurrentUser() user: UserPayload) {
    const studentId = user.sub

    const result = await this.fetchExerciseExecutionsByUser.execute({
      studentId,
    })

    if (result.isLeft()) {
      return null
    }

    return {
      exerciseExecutions: result.value.exerciseExecutions.map(
        HttpExerciseExecutionPresenter.toHTTP,
      ),
    }
  }
}
