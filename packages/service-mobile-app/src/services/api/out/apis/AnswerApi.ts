/* tslint:disable */
/* eslint-disable */

import * as runtime from '../runtime';
import type {
  AnswerIdResponse,
  AnswerModel,
  CreateAnswerModel,
  IdAnswerModel,
  UpdateAnswerModel,
  UpdateAnswerOrderModel,
} from '../models/index';

export interface DeleteAnswerRequest {
    idAnswerModel: IdAnswerModel;
}

export interface GetAnswerRequest {
    id: string;
}

export interface RegisterAnswerRequest {
    createAnswerModel: CreateAnswerModel;
}

export interface UpdateAnswerRequest {
    id: string;
    updateAnswerModel: UpdateAnswerModel;
}

export interface UpdateAnswerOrderRequest {
    updateAnswerOrderModel: UpdateAnswerOrderModel;
}

/**
 */
export class AnswerApi extends runtime.BaseAPI {

    /**
     */
    async deleteAnswerRaw(requestParameters: DeleteAnswerRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AnswerIdResponse> {
        if (requestParameters.idAnswerModel === null || requestParameters.idAnswerModel === undefined) {
            throw new runtime.RequiredError('idAnswerModel','Required parameter requestParameters.idAnswerModel was null or undefined when calling deleteAnswer.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/answer`,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.idAnswerModel,
        }, initOverrides);

        return response.json();
    }

    /**
     */
    static deleteAnswer(requestParameters: DeleteAnswerRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AnswerIdResponse> {
        return localAnswerApi.deleteAnswerRaw(requestParameters, initOverrides);
    }

    /**
     */
    async getAnswerRaw(requestParameters: GetAnswerRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AnswerModel> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getAnswer.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/answer/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return response.json();
    }

    /**
     */
    static getAnswer(requestParameters: GetAnswerRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AnswerModel> {
        return localAnswerApi.getAnswerRaw(requestParameters, initOverrides);
    }

    /**
     */
    async registerAnswerRaw(requestParameters: RegisterAnswerRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AnswerIdResponse> {
        if (requestParameters.createAnswerModel === null || requestParameters.createAnswerModel === undefined) {
            throw new runtime.RequiredError('createAnswerModel','Required parameter requestParameters.createAnswerModel was null or undefined when calling registerAnswer.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/answer`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.createAnswerModel,
        }, initOverrides);

        return response.json();
    }

    /**
     */
    static registerAnswer(requestParameters: RegisterAnswerRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AnswerIdResponse> {
        return localAnswerApi.registerAnswerRaw(requestParameters, initOverrides);
    }

    /**
     */
    async updateAnswerRaw(requestParameters: UpdateAnswerRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AnswerIdResponse> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateAnswer.');
        }

        if (requestParameters.updateAnswerModel === null || requestParameters.updateAnswerModel === undefined) {
            throw new runtime.RequiredError('updateAnswerModel','Required parameter requestParameters.updateAnswerModel was null or undefined when calling updateAnswer.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/answer/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.updateAnswerModel,
        }, initOverrides);

        return response.json();
    }

    /**
     */
    static updateAnswer(requestParameters: UpdateAnswerRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AnswerIdResponse> {
        return localAnswerApi.updateAnswerRaw(requestParameters, initOverrides);
    }

    /**
     */
    async updateAnswerOrderRaw(requestParameters: UpdateAnswerOrderRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AnswerIdResponse> {
        if (requestParameters.updateAnswerOrderModel === null || requestParameters.updateAnswerOrderModel === undefined) {
            throw new runtime.RequiredError('updateAnswerOrderModel','Required parameter requestParameters.updateAnswerOrderModel was null or undefined when calling updateAnswerOrder.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/answer`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.updateAnswerOrderModel,
        }, initOverrides);

        return response.json();
    }

    /**
     */
    static updateAnswerOrder(requestParameters: UpdateAnswerOrderRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AnswerIdResponse> {
        return localAnswerApi.updateAnswerOrderRaw(requestParameters, initOverrides);
    }

}

const localAnswerApi = new AnswerApi();
