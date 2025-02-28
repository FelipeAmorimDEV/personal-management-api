import { Injectable } from '@nestjs/common'
import Stripe from 'stripe'

@Injectable()
export class StripeService {
  private stripe: Stripe

  constructor() {
    this.stripe = new Stripe(
      'sk_test_51QxFqKCvdixTyBPMpDZah7ceHHJVjATqt6WqDddtjrzAPceIKRvx9FXd4EvmJ7YSDP8J0mCFC6cHShHa4eTgVFmN00pHn46UWf',
    )
  }

  async createCheckoutSession(amount: number, currency: string) {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['boleto', 'card'],
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: 'Plano de Treino',
            },
            unit_amount: amount, // valor em centavos (exemplo: 10000 = 100 reais)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url:
        'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:3000/cancel',
    })

    console.log('Session', session)

    return {
      url: session.url,
      paymentIntentId: session.payment_intent as string | null, // Assegura que o ID seja retornado como string ou null
    }
  }
}
