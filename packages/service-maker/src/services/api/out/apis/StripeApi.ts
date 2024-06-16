/* tslint:disable */
/* eslint-disable */

import * as runtime from '../runtime';

export interface CreatePaymentIntentRequest {
    amount: number;
    currency: CreatePaymentIntentCurrencyEnum;
}

export interface HandleWebhookRequest {
    stripeSignature: string;
}

/**
 */
export class StripeApi extends runtime.BaseAPI {

    /**
     */
    async createPaymentIntentRaw(requestParameters: CreatePaymentIntentRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        if (requestParameters.amount === null || requestParameters.amount === undefined) {
            throw new runtime.RequiredError('amount','Required parameter requestParameters.amount was null or undefined when calling createPaymentIntent.');
        }

        if (requestParameters.currency === null || requestParameters.currency === undefined) {
            throw new runtime.RequiredError('currency','Required parameter requestParameters.currency was null or undefined when calling createPaymentIntent.');
        }

        const queryParameters: any = {};

        if (requestParameters.amount !== undefined) {
            queryParameters['amount'] = requestParameters.amount;
        }

        if (requestParameters.currency !== undefined) {
            queryParameters['currency'] = requestParameters.currency;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/stripe/create-payment-intent`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

    }

    /**
     */
    static createPaymentIntent(requestParameters: CreatePaymentIntentRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        return localStripeApi.createPaymentIntentRaw(requestParameters, initOverrides);
    }

    /**
     */
    async handleWebhookRaw(requestParameters: HandleWebhookRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        if (requestParameters.stripeSignature === null || requestParameters.stripeSignature === undefined) {
            throw new runtime.RequiredError('stripeSignature','Required parameter requestParameters.stripeSignature was null or undefined when calling handleWebhook.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters.stripeSignature !== undefined && requestParameters.stripeSignature !== null) {
            headerParameters['stripe-signature'] = String(requestParameters.stripeSignature);
        }

        const response = await this.request({
            path: `/stripe/webhook`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

    }

    /**
     */
    static handleWebhook(requestParameters: HandleWebhookRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        return localStripeApi.handleWebhookRaw(requestParameters, initOverrides);
    }

}

const localStripeApi = new StripeApi();

/**
 * @export
 */
export const CreatePaymentIntentCurrencyEnum = {
    Usd: 'usd',
    Eur: 'eur',
    Gbp: 'gbp'
} as const;
export type CreatePaymentIntentCurrencyEnum = typeof CreatePaymentIntentCurrencyEnum[keyof typeof CreatePaymentIntentCurrencyEnum];
