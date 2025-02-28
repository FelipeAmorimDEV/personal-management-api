export abstract class StripeServiceRepository {
  abstract createCheckoutSession(
    amount: number,
    currency: string,
  ): Promise<{ url: string; paymentIntentId: string }>
}
