import {
  Controller,
  Post,
  Req,
  Res,
  Headers,
  BadRequestException,
} from '@nestjs/common'
import { Response, Request } from 'express'
import Stripe from 'stripe'
import { ConfigService } from '@nestjs/config'

@Controller('webhook/stripe')
export class StripeWebhookController {
  private stripe: Stripe
  private webhookSecret: string

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(
      'sk_test_51QxFqKCvdixTyBPMpDZah7ceHHJVjATqt6WqDddtjrzAPceIKRvx9FXd4EvmJ7YSDP8J0mCFC6cHShHa4eTgVFmN00pHn46UWf',
    )
    this.webhookSecret = 'we_1QxW5uCvdixTyBPMBImhKSaw'
  }

  @Post()
  async handleWebhook(
    @Req() req: Request,
    @Res() res: Response,
    @Headers('stripe-signature') signature: string,
  ) {
    let event: Stripe.Event

    // Verifica se a assinatura do webhook é válida
    try {
      event = this.stripe.webhooks.constructEvent(
        req.body,
        signature,
        this.webhookSecret,
      )
    } catch (err: any) {
      console.error('Erro ao verificar webhook:', err.message)
      throw new BadRequestException(`Webhook error: ${err.message}`)
    }

    // Processar os eventos do Stripe
    switch (event.type) {
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        console.log(`✅ Pagamento confirmado para Invoice: ${invoice.id}`)

        // Aqui você pode atualizar o status no banco de dados
        // Exemplo: this.orderService.updateInvoiceStatus(invoice.id, 'paid')

        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        console.log(`❌ Pagamento falhou para Invoice: ${invoice.id}`)

        // Atualizar o status para "não pago" no banco de dados
        // Exemplo: this.orderService.updateInvoiceStatus(invoice.id, 'failed')

        break
      }

      default:
        console.log(`ℹ️ Evento não tratado: ${event.type}`)
    }

    return res.status(200).json({ received: true })
  }
}
