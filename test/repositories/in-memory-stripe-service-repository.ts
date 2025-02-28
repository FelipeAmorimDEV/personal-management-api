import { StripeServiceRepository } from '@/domain/payments/applications/repositories/stripe-service-repository'

export class InMemoryStripeServiceRepository
  implements StripeServiceRepository
{
  async createCheckoutSession(): Promise<{
    url: string
    paymentIntentId: string
  }> {
    return {
      url: 'http://localhost:3000/payments/checkout/123456789',
      paymentIntentId: '123456789',
    }
  }
}
