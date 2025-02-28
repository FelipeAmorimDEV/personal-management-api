import {
  Controller,
  Post,
  Req,
  Res,
  Headers,
  RawBodyRequest,
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
    @Req() req: RawBodyRequest<Request>, // 🛑 Pegamos o rawBody aqui
    @Res() res: Response,
    @Headers('stripe-signature') signature: string,
  ) {
    let event: Stripe.Event

    // 🔥 Agora o Stripe recebe o rawBody corretamente
    const rawBody = req.body as Buffer

    try {
      event = this.stripe.webhooks.constructEvent(
        rawBody,
        signature,
        this.webhookSecret,
      )
    } catch (err) {
      console.error('Erro ao verificar webhook:', err.message)
      return res.status(400).send(`Webhook error: ${err.message}`)
    }

    // Processar eventos do Stripe
    switch (event.type) {
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        console.log(`✅ Pagamento confirmado para Invoice: ${invoice.id}`)
        // Atualizar o status da invoice no banco de dados
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        console.log(`❌ Pagamento falhou para Invoice: ${invoice.id}`)
        // Atualizar o status para "não pago" no banco de dados
        break
      }

      default:
        console.log(`ℹ️ Evento não tratado: ${event.type}`)
    }

    return res.status(200).json({ received: true })
  }
}
