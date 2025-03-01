import { Controller, Post, Body } from '@nestjs/common'
import { StripeService } from './stripe.service'
import { VinculaFaturaUseCase } from '@/domain/payments/applications/use-cases/vincula-fatura'

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly stripeService: StripeService,
    private vinculaFaturaUseCase: VinculaFaturaUseCase,
  ) {}

  @Post('create-checkout-session')
  async createCheckoutSession(
    @Body()
    body: {
      amount: number
      currency: string
      email: string
      invoiceFatura: string
    },
  ) {
    const { url, invoiceId } = await this.stripeService.createCheckoutSession(
      body.amount,
      body.currency,
      body.email,
    )

    await this.vinculaFaturaUseCase.execute({
      invoiceId: body.invoiceFatura,
      checkoudId: invoiceId,
    })

    return { url }
  }
}
