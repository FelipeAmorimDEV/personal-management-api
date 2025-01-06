import { FetchExerciseExecutionsUseCase } from '@/domain/progress-tracking/applications/use-cases/fetch-exercise-executions'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { UserPayload } from '@/infra/auth/jwt-strategy'
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common'
import { HttpExerciseExecutionPresenter } from '../presenters/http-exercise-execution'

@Controller('exercises/:id/execution')
export class FetchExerciseExecutionController {
  constructor(
    private fetchExerciseExecutions: FetchExerciseExecutionsUseCase,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('id') exerciseId: string,
    @Query('page') page: number,
  ) {
    const studentId = user.sub

    const result = await this.fetchExerciseExecutions.execute({
      exerciseId,
      studentId,
      page,
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
