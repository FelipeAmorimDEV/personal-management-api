import { GetStudentProfileUseCase } from '@/domain/identity-management/applications/use-cases/get-student-profile'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt-strategy'
import { Controller, Get, UseGuards } from '@nestjs/common'
import { HttpProfilePresenter } from '../presenters/http-profile-presenter'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'

@Controller('profile')
export class GetStudentProfileController {
  constructor(private getStudentProfile: GetStudentProfileUseCase) {}
  @Get()
  @UseGuards(JwtAuthGuard)
  async handle(@CurrentUser() user: UserPayload) {
    const studentId = user.sub

    const result = await this.getStudentProfile.execute({
      studentId,
    })

    if (result.isLeft()) {
      return null
    }

    return { profile: HttpProfilePresenter.toHTTP(result.value.profile) }
  }
}
