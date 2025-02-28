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
      case 'invoice.payment_succeeded': // Alterado para esse evento
        const invoice = event.data.object as Stripe.Invoice
        console.log(`✅ Pagamento da fatura bem-sucedido: ${invoice.id}`)

        // Use o ID da fatura para sua lógica de negócios
        this.markInvoicePaid.execute({
          invoiceId: invoice.id, // Use invoice.id
        })
        break

      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log(`✅ Pagamento bem-sucedido: ${paymentIntent.id}`)

        // Se necessário, também pode pegar o ID da fatura aqui
        if (paymentIntent.invoice) {
          const invoiceId = paymentIntent.invoice
          console.log(`📄 ID da fatura: ${invoiceId}`)

          // Usar o ID da fatura para marcar como paga
          this.markInvoicePaid.execute({
            invoiceId,
          })
        }
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
