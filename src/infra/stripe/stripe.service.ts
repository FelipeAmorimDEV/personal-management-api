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

  async createCheckoutSession(
    amount: number,
    currency: string,
    customerEmail: string,
  ) {
    try {
      const customer = await this.findOrCreateCustomer(customerEmail)

      const session = await this.stripe.checkout.sessions.create({
        customer: customer.id,
        payment_method_types: ['card', 'boleto'],
        mode: 'payment',
        line_items: [
          {
            price_data: {
              currency,
              product_data: { name: 'Plano de Treino' },
              unit_amount: amount,
            },
            quantity: 1,
          },
        ],
        success_url: `seuapp://success`, // URL personalizada para redirecionamento no app
        cancel_url: `seuapp://cancel`, // URL personalizada para redirecionamento no app
      })

      console.log('Session', session)

      return {
        url: session.url,
        paymentIntentId: session.payment_intent?.toString(),
        invoiceId: session.id,
      }
    } catch (error) {
      console.error('Erro ao criar sessão de checkout:', error)
      throw new Error('Falha ao criar sessão de pagamento')
    }
  }

  private async findOrCreateCustomer(email: string) {
    const customers = await this.stripe.customers.list({ email, limit: 1 })
    return customers.data.length
      ? customers.data[0]
      : await this.stripe.customers.create({ email })
  }

  private async createInvoice(
    customerId: string,
    amount: number,
    currency: string,
  ) {
    await this.stripe.invoiceItems.create({
      customer: customerId,
      amount,
      currency,
      description: 'Plano de Treino',
    })

    return this.stripe.invoices.create({
      customer: customerId,
      auto_advance: true,
      collection_method: 'charge_automatically',
    })
  }
}
