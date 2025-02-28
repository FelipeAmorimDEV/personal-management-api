import { Controller, Post, Body } from '@nestjs/common'
import { StripeService } from './stripe.service'

@Controller('payment')
export class PaymentController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('create-checkout-session')
  async createCheckoutSession(
    @Body() body: { amount: number; currency: string },
  ) {
    const { url } = await this.stripeService.createCheckoutSession(
      body.amount,
      body.currency,
    )
    return { url }
  }
}
