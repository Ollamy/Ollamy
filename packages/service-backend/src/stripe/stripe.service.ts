import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { STRIPE_PRIVATE_KEY, STRIPE_WEBHOOK_SECRET, FRONTEND_URL } from 'setup';
import { CreateProductDto, CurrencyType } from './stripe.dto';
import prisma from 'client';

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

  async createProduct(body: CreateProductDto, ctx: any) {
    const stripeProduct = await this.stripe.products.create({
      name: body.name,
      description: body.description,
      metadata: {
        user_id: ctx.__user.id,
        price: body.price,
        currency: body.currency,
        interval: body.renewal,
      }
    });

    if (!stripeProduct) {
      throw new Error('Could not create product');
    }

    const stripePrice = await this.stripe.prices.create({
      product: stripeProduct.id,
      currency: body.currency,
      unit_amount: body.price,
      recurring: {
        interval: body.renewal,
      },
      metadata: {
        user_id: ctx.__user.id,
      }
    });

    if (!stripePrice) {
      throw new Error('Could not create price');
    }

    const product = await prisma.product.create({
      data: {
        id: stripeProduct.id,
        price_id: stripePrice.id,
        user_id: ctx.__user.id,
        renewals: !!body.renewal,
      },
    });

    if (!product) {
      throw new Error('Could not create product in database');
    }

    return product;
  }

  async retrieveProducts(ctx: any) {
    const ids = await prisma.product.findMany({
      where: {
        user_id: ctx.__user.id,
        active: true,
      },
      select: {
        id: true,
      },
    });


    return (await this.stripe.products.list({
      ids: ids.map((id) => id.id),
      active: true,
    })).data;
  }

  async deleteProducts(productIds: string[], ctx: any) {
    const dbProducts = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
        user_id: ctx.__user.id,
      },
      select: {
        id: true,
      },
    });

    if (!Array.isArray(productIds) || dbProducts.length !== productIds.length) {
      throw new Error('Some products not found');
    }

    await Promise.all(
      dbProducts.map(async (product) => {
        await this.stripe.products.update(product.id, {
          active: false,
        });
      })
    );

    await prisma.product.updateMany({
      where: {
        id: {
          in: productIds,
        },
        user_id: ctx.__user.id,
      },
      data: {
        active: false,
      },
    });

    return { 'success': 'Products deleted successfully' };
  }

  async createPaymentLink(product_id: string, ctx: any) {
    const product = await prisma.product.findFirst({
      where: {
        id: product_id,
        user_id: ctx.__user.id,
        active: true,
      },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: product.price_id,
          quantity: 1,
        },
      ],
      mode: product.renewals ? 'subscription' : 'payment',
      success_url: `${FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${FRONTEND_URL}/cancel?session_id={CHECKOUT_SESSION_ID}`,
    });

    return session;
  }

  async checkSessionStatus(session_id: string) {
    return await this.stripe.checkout.sessions.retrieve(session_id);
  }
}
