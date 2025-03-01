import Stripe from 'stripe'

export abstract class StripeServiceRepository {
  abstract createCheckoutSession(
    amount: number,
    currency: string,
    customerEmail: string,
  ): Promise<{ url: string; paymentIntentId: string; invoiceId: string }>

  abstract findOrCreateCustomer(email: string): Promise<Stripe.Customer>
}
