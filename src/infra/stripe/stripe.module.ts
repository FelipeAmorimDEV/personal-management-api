import { Module } from '@nestjs/common'
import { PaymentController } from './stripe.controller'
import { StripeService } from './stripe.service'
import { StripeServiceRepository } from '@/domain/payments/applications/repositories/stripe-service-repository'

@Module({
  controllers: [PaymentController],
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
