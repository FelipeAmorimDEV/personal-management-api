import { Controller, Get, UseGuards } from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt-strategy'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { FetchMyProgressUpdateUseCase } from '@/domain/progress-tracking/applications/use-cases/fetch-my-progress-update'
import { HttpMyProgressUpdateWithDetails } from '../presenters/http-my-progress-update-with-details'

@Controller('my-progress')
@UseGuards(JwtAuthGuard)
export class FetchMyProgressUpdateController {
  constructor(private fetchMyProgressUpdate: FetchMyProgressUpdateUseCase) {}

  @Get()
  async handle(@CurrentUser() user: UserPayload) {
    const studentId = user.sub

    const result = await this.fetchMyProgressUpdate.execute({
      studentId,
    })

    if (result.isLeft()) {
      return null
    }

    return {
      myProgress: result.value.myProgressUpdates.map(
        HttpMyProgressUpdateWithDetails.toHTTP,
      ),
    }
  }
}
