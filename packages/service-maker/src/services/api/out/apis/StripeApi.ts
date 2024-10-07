/* tslint:disable */
/* eslint-disable */

import * as runtime from '../runtime';
import type {
  CreateProductDto,
} from '../models/index';

export interface CheckSessionStatusRequest {
    sessionId: string;
}

export interface CreatePaymentIntentRequest {
    amount: number;
    currency: CreatePaymentIntentCurrencyEnum;
}

export interface CreatePaymentLinkRequest {
    productId: string;
}

export interface CreateProductRequest {
    createProductDto: CreateProductDto;
}

export interface DeleteProductsRequest {
    requestBody: Array<string>;
}

export interface HandleWebhookRequest {
    stripeSignature: string;
}

/**
 */
export class StripeApi extends runtime.BaseAPI {

    /**
     */
    async checkSessionStatusRaw(requestParameters: CheckSessionStatusRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        if (requestParameters.sessionId === null || requestParameters.sessionId === undefined) {
            throw new runtime.RequiredError('sessionId','Required parameter requestParameters.sessionId was null or undefined when calling checkSessionStatus.');
        }

        const queryParameters: any = {};

        if (requestParameters.sessionId !== undefined) {
            queryParameters['session_id'] = requestParameters.sessionId;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/stripe/check-session-status`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

    }

    /**
     */
    static checkSessionStatus(requestParameters: CheckSessionStatusRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        return localStripeApi.checkSessionStatusRaw(requestParameters, initOverrides);
    }

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
    async createPaymentLinkRaw(requestParameters: CreatePaymentLinkRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        if (requestParameters.productId === null || requestParameters.productId === undefined) {
            throw new runtime.RequiredError('productId','Required parameter requestParameters.productId was null or undefined when calling createPaymentLink.');
        }

        const queryParameters: any = {};

        if (requestParameters.productId !== undefined) {
            queryParameters['product_id'] = requestParameters.productId;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/stripe/create-payment-link`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

    }

    /**
     */
    static createPaymentLink(requestParameters: CreatePaymentLinkRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        return localStripeApi.createPaymentLinkRaw(requestParameters, initOverrides);
    }

    /**
     */
    async createProductRaw(requestParameters: CreateProductRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        if (requestParameters.createProductDto === null || requestParameters.createProductDto === undefined) {
            throw new runtime.RequiredError('createProductDto','Required parameter requestParameters.createProductDto was null or undefined when calling createProduct.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/stripe/create-product`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.createProductDto,
        }, initOverrides);

    }

    /**
     */
    static createProduct(requestParameters: CreateProductRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        return localStripeApi.createProductRaw(requestParameters, initOverrides);
    }

    /**
     */
    async deleteProductsRaw(requestParameters: DeleteProductsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        if (requestParameters.requestBody === null || requestParameters.requestBody === undefined) {
            throw new runtime.RequiredError('requestBody','Required parameter requestParameters.requestBody was null or undefined when calling deleteProducts.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/stripe/delete-products`,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.requestBody,
        }, initOverrides);

    }

    /**
     */
    static deleteProducts(requestParameters: DeleteProductsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        return localStripeApi.deleteProductsRaw(requestParameters, initOverrides);
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

    /**
     */
    async retrieveProductsRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/stripe/retrieve-products`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

    }

    /**
     */
    static retrieveProducts(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        return localStripeApi.retrieveProductsRaw(initOverrides);
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
