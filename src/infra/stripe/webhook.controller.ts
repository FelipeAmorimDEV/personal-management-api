/* eslint-disable no-case-declarations */
import { MarkInvoicePaidUseCase } from '@/domain/payments/applications/use-cases/mark-invoice-paid'
import { Controller, Post, Req, Res, Headers } from '@nestjs/common'
import { Response, Request } from 'express'
import Stripe from 'stripe'

@Controller('webhook')
export class WebhookController {
  private stripe: Stripe
  private endpointSecret = 'whsec_oklLws15peJeYicGK2deo7e2yUETxIOE' // Substitua com o segredo do seu webhook no Stripe

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
      // Valida a assinatura do evento
      event = this.stripe.webhooks.constructEvent(
        rawBody,
        signature,
        this.endpointSecret,
      )
    } catch (err: any) {
      console.error('❌ Erro na validação do webhook:', err.message)
      return res.status(400).send(`Webhook error: ${err.message}`)
    }

    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log(`✅ Evento recebido: ${event.type}`)
        const paymentId = paymentIntent.metadata.invoiceId
        console.log(`✅ ID da fatura: ${paymentId}`)
        if (paymentId) {
          // Chama o caso de uso para atualizar a fatura como paga
          await this.markInvoicePaid.execute({
            invoiceId: paymentId,
          })

          console.log(`✅ Fatura ${paymentId} atualizada para pago!`)
        }
        break

      default:
        console.log(`ℹ️ Evento não tratado: ${event.type}`)
    }

    // Retorna uma resposta indicando que o evento foi recebido
    return res.json({ received: true })
  }
}
