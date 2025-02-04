import { FetchPaymentsUseCase } from '@/domain/payments/applications/use-cases/fetch-payments'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { BadRequestException, Controller, Get, UseGuards } from '@nestjs/common'
import { HttpPaymentsPresenter } from '../presenters/http-payments-presenter'
import { UserPayload } from '@/infra/auth/jwt-strategy'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'

@Controller('payments')
@UseGuards(JwtAuthGuard)
export class FetchPaymentsController {
  constructor(private fetchPayments: FetchPaymentsUseCase) {}
  @Get()
  async handle(@CurrentUser() user: UserPayload) {
    const studentId = user.sub

    const result = await this.fetchPayments.execute({ studentId })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return result.value.payments.map(HttpPaymentsPresenter.toHTTP)
  }
}
