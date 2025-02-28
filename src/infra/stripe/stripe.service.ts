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
    // 1️⃣ Criar ou recuperar o cliente do Stripe
    const customer = await this.findOrCreateCustomer(customerEmail)

    // 2️⃣ Criar um Invoice Item para a fatura
    await this.stripe.invoiceItems.create({
      customer: customer.id,
      amount,
      currency,
      description: 'Plano de Treino',
    })

    let invoice = await this.stripe.invoices.create({
      customer: customer.id,
      auto_advance: true, // A fatura será finalizada automaticamente
      collection_method: 'charge_automatically',
    })

    // 4️⃣ Finalizar a Invoice para gerar o PaymentIntent
    invoice = await this.stripe.invoices.finalizeInvoice(invoice.id)

    // 🔍 Buscar a fatura novamente para garantir que o PaymentIntent foi gerado
    invoice = await this.stripe.invoices.retrieve(invoice.id)

    // 5️⃣ Criar a sessão de checkout vinculada ao PaymentIntent da Invoice
    const session = await this.stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ['boleto', 'card'],
      mode: 'payment',
      payment_intent_data: {
        setup_future_usage: 'off_session', // Permite pagamentos futuros
      },
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
      success_url:
        'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:3000/cancel',
    })

    return {
      url: session.url,
      paymentIntentId: invoice.payment_intent, // 🔗 Agora sempre retorna um PaymentIntent válido
      invoiceId: invoice.id,
    }
  }

  // Função auxiliar para encontrar ou criar um cliente no Stripe
  private async findOrCreateCustomer(email: string) {
    const existingCustomers = await this.stripe.customers.list({ email })
    if (existingCustomers.data.length > 0) {
      return existingCustomers.data[0] // Retorna o primeiro cliente encontrado
    }
    return this.stripe.customers.create({ email }) // Cria um novo cliente se não existir
  }
}
