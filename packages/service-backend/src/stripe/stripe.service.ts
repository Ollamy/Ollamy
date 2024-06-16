import { Inject, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { STRIPE_PUBLIC_KEY } from '../setup';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(@Inject(STRIPE_PUBLIC_KEY) private readonly apiKey: string) {
    this.stripe = new Stripe(this.apiKey, {});
  }

  async getProducts(): Promise<Stripe.Product[]> {
    const products = await this.stripe.products.list();
    return products.data;
  }

  async getCustomers() {
    const customers = await this.stripe.customers.list({});
    return customers.data;
  }
}
