import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { STRIPE_PRIVATE_KEY, STRIPE_WEBHOOK_SECRET } from 'setup';
import { CurrencyType } from './stripe.dto';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(STRIPE_PRIVATE_KEY, {});
  }

  async createPaymentIntent(amount: number, currency: CurrencyType) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency,
        automatic_payment_methods: {
          enabled: true,
        },
      });
      return paymentIntent;
    } catch (err) {
      throw err;
    }
  }

  async handleWebhook(body: Buffer | string, signature: string) {
    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(
        body,
        signature,
        STRIPE_WEBHOOK_SECRET,
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      throw err;
    }

    switch (event.type) {
      case 'payment_intent.succeeded':
        console.debug('💰 Payment received!');
        break;
      case 'payment_intent.created':
        console.debug('🔔 Payment intent created');
        break;
      case 'charge.updated':
        console.debug('🔔 Charge updated');
        break;
      case 'charge.succeeded':
        console.debug('💰 Charge succeeded');
        break;
      // ... other event handlers
      default:
        console.debug(`🤷‍♀️ Unhandled event type: ${event.type}`);
    }
  }
}
