/* eslint-disable no-case-declarations */
import { MarkInvoicePaidUseCase } from '@/domain/payments/applications/use-cases/mark-invoice-paid'
import { Controller, Post, Req, Res, Headers } from '@nestjs/common'
import { Response, Request } from 'express'
import Stripe from 'stripe'

@Controller('webhook')
export class WebhookController {
  private stripe: Stripe

  constructor(private markInvoicePaid: MarkInvoicePaidUseCase) {
    this.stripe = new Stripe(
      'sk_test_51QxFqKCvdixTyBPMpDZah7ceHHJVjATqt6WqDddtjrzAPceIKRvx9FXd4EvmJ7YSDP8J0mCFC6cHShHa4eTgVFmN00pHn46UWf',
    )
  }

  @Post()
  async handleWebhook(
    @Req() req: Request,
    @Res() res: Response,
    @Headers('stripe-signature') signature: string,
  ) {
    let event: Stripe.Event

    try {
      const rawBody = req.body as Buffer
      event = JSON.parse(rawBody.toString()) // ⚠️ Remova essa linha se for validar assinatura
    } catch (err: any) {
      console.error('❌ Erro ao processar webhook:', err.message)
      return res.status(400).send(`Webhook error: ${err.message}`)
    }

    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        if (paymentIntent.invoice) {
          const stripeInvoiceId = paymentIntent.invoice.toString()

          await this.markInvoicePaid.execute({
            invoiceId: stripeInvoiceId,
          })

          console.log(`✅ Fatura ${stripeInvoiceId} atualizada para pago!`)
        }

        break

      default:
        console.log(`ℹ️ Evento não tratado: ${event.type}`)
    }

    return res.json({ received: true })
  }
}
