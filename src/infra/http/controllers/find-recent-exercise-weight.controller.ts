import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { UserPayload } from '@/infra/auth/jwt-strategy'
import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { HttpExerciseExecutionPresenter } from '../presenters/http-exercise-execution'
import { FindRecentWeightUseCase } from '@/domain/progress-tracking/applications/use-cases/find-recent-weight'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'

const paramsSchema = z.object({
  id: z.string().uuid(),
})

type ParamsSchema = z.infer<typeof paramsSchema>

const zodValidationPipe = new ZodValidationPipe(paramsSchema)

@Controller('exercises/:id/executions')
export class FindRecentExerciseWeightController {
  constructor(private findRecentExerciseWeight: FindRecentWeightUseCase) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async handle(
    @Param(zodValidationPipe) params: ParamsSchema,
    @CurrentUser() user: UserPayload,
  ) {
    const studentId = user.sub
    const { id } = params

    const result = await this.findRecentExerciseWeight.execute({
      studentId,
      exerciseId: id,
    })

    if (result.isLeft()) {
      return null
    }

    return {
      exerciseExecution: HttpExerciseExecutionPresenter.toHTTP(
        result.value.exerciseExecution,
      ),
    }
  }
}
