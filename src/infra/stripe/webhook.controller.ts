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
      // 🔥 Garantir que o corpo da requisição seja um Buffer
      const rawBody = req.body as Buffer

      event = JSON.parse(rawBody.toString()) // ⚠️ Apenas se NÃO for necessário validar assinatura
    } catch (err: any) {
      console.error('❌ Erro ao processar webhook:', err.message)
      return res.status(400).send(`Webhook error: ${err.message}`)
    }

    // 🎯 Tratamento dos eventos
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log(`✅ Pagamento bem-sucedido: ${paymentIntent.id}`)

        if (!paymentIntent.invoice) {
          console.log('❌ Invoice não encontrado para o pagamento')
          break
        }

        this.markInvoicePaid.execute({
          invoiceId: paymentIntent.invoice.toString(),
        })
        break

      case 'payment_method.attached':
        const paymentMethod = event.data.object as Stripe.PaymentMethod
        console.log(`💳 Método de pagamento anexado: ${paymentMethod.id}`)
        break

      default:
        console.log(`ℹ️ Evento não tratado: ${event.type}`)
    }

    return res.json({ received: true })
  }
}
