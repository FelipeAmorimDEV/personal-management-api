import { FetchPaymentDueUseCase } from '@/domain/payments/applications/use-cases/fetch-payment-due'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { BadRequestException, Controller, Get, UseGuards } from '@nestjs/common'
import { HttpPaymentsPresenter } from '../presenters/http-payments-presenter'

@Controller('fetch-payment-due')
@UseGuards(JwtAuthGuard)
export class FetchPaymentDueController {
  constructor(private fetchPaymentDue: FetchPaymentDueUseCase) {}
  @Get()
  async handle() {
    const result = await this.fetchPaymentDue.execute()

    if (result.isLeft()) {
      return result.value
    }

    return { paymentDue: HttpPaymentsPresenter.toHTTP(result.value?.payment) }
  }
}
