import { Module } from '@nestjs/common'
import { PaymentController } from './stripe.controller'
import { StripeService } from './stripe.service'
import { StripeServiceRepository } from '@/domain/payments/applications/repositories/stripe-service-repository'
import { StripeWebhookController } from './webhook.controller'

@Module({
  controllers: [PaymentController, StripeWebhookController],
  providers: [
    {
      provide: StripeServiceRepository,
      useClass: StripeService,
    },
    StripeService,
  ],
  exports: [StripeServiceRepository],
})
export class StripeModule {}
