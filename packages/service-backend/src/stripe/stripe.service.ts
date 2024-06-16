import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { STRIPE_PRIVATE_KEY, STRIPE_WEBHOOK_SECRET } from '../setup';
import { CurrencyType } from './stripe.dto';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(STRIPE_PRIVATE_KEY, {});
  }

  async createPaymentIntent(amount: number, currency: CurrencyType) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });
    return paymentIntent;
  }

  async handleWebhook(body: Buffer, signature: string) {

    let event: any = body;

    try {
      event = this.stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      throw err;
    }

    switch (event.type) {
      case 'payment_intent.succeeded':
        console.log('💰 Payment received!');
        break;
      // ... other event handlers
      default:
      // console.log(`Unhandled event type ${event.type}`);
    }
  } catch(err) {
    // console.error('Webhook error:', err.message);
    throw err;
  }
}
