import { Module } from '@nestjs/common'
import { PaymentController } from './stripe.controller'
import { StripeService } from './stripe.service'
import { StripeServiceRepository } from '@/domain/payments/applications/repositories/stripe-service-repository'
import { WebhookController } from './webhook.controller'
import { MarkInvoicePaidUseCase } from '@/domain/payments/applications/use-cases/mark-invoice-paid'
import { DatabaseModule } from '../database/database.module'
import { VinculaFaturaUseCase } from '@/domain/payments/applications/use-cases/vincula-fatura'
import { PaymentStatusController } from './payment-status.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [PaymentController, WebhookController, PaymentStatusController],
  providers: [
    {
      provide: StripeServiceRepository,
      useClass: StripeService,
    },
    StripeService,
    MarkInvoicePaidUseCase,
    VinculaFaturaUseCase,
  ],
  exports: [StripeServiceRepository],
})
export class StripeModule {}
