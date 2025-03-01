import { Injectable } from '@nestjs/common'
import Stripe from 'stripe'
import { InvoiceRepository } from '@/infra/database/invoice.repository'

@Injectable()
export class StripeService {
  private stripe: Stripe

  constructor(private invoiceRepository: InvoiceRepository) {
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
        success_url: `http://localhost:3333/success?session_id=`,
        cancel_url: `http://localhost:3333/cancel`,
      })

      const invoice = await this.createInvoice(customer.id, amount, currency)

      console.log('SessionURL', session.url)
      console.log('InvoiceID', invoice.id)
      console.log('PaymentIntentID', session.payment_intent?.toString())

      return {
        url: session.url,
        paymentIntentId: session.payment_intent?.toString(),
        invoiceId: invoice.id,
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
