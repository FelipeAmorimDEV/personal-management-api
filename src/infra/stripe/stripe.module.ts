import { Module } from '@nestjs/common'
import { PaymentController } from './stripe.controller'
import { StripeService } from './stripe.service'
import { StripeServiceRepository } from '@/domain/payments/applications/repositories/stripe-service-repository'
import { WebhookController } from './webhook.controller'
import { MarkInvoicePaidUseCase } from '@/domain/payments/applications/use-cases/mark-invoice-paid'

@Module({
  controllers: [PaymentController, WebhookController],
  providers: [
    {
      provide: StripeServiceRepository,
      useClass: StripeService,
    },
    StripeService,
    MarkInvoicePaidUseCase,
  ],
  exports: [StripeServiceRepository],
})
export class StripeModule {}
