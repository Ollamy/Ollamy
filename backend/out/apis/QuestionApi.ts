/* tslint:disable */
/* eslint-disable */
/**
 * Ollamy API
 * So insane API
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  CreateQuestionModel,
  IdQuestionModel,
  QuestionModel,
  UpdateQuestionModel,
} from '../models';

export interface DeleteQuestionRequest {
    authorizationToken: string;
    idQuestionModel: IdQuestionModel;
}

export interface GetQuestionRequest {
    id: string;
    authorizationToken: string;
}

export interface RegisterQuestionRequest {
    authorizationToken: string;
    createQuestionModel: CreateQuestionModel;
}

export interface UpdateQuestionRequest {
    id: string;
    authorizationToken: string;
    updateQuestionModel: UpdateQuestionModel;
}

/**
 * 
 */
export class QuestionApi extends runtime.BaseAPI {

    /**
     */
    async deleteQuestionRaw(requestParameters: DeleteQuestionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        if (requestParameters.authorizationToken === null || requestParameters.authorizationToken === undefined) {
            throw new runtime.RequiredError('authorizationToken','Required parameter requestParameters.authorizationToken was null or undefined when calling deleteQuestion.');
        }

        if (requestParameters.idQuestionModel === null || requestParameters.idQuestionModel === undefined) {
            throw new runtime.RequiredError('idQuestionModel','Required parameter requestParameters.idQuestionModel was null or undefined when calling deleteQuestion.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (requestParameters.authorizationToken !== undefined && requestParameters.authorizationToken !== null) {
            headerParameters['Authorization_token'] = String(requestParameters.authorizationToken);
        }

        const response = await this.request({
            path: `/question`,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.idQuestionModel,
        }, initOverrides);

        return new runtime.TextApiResponse(response) as any;
    }

    /**
     */
    async deleteQuestion(requestParameters: DeleteQuestionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.deleteQuestionRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async getQuestionRaw(requestParameters: GetQuestionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<QuestionModel>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getQuestion.');
        }

        if (requestParameters.authorizationToken === null || requestParameters.authorizationToken === undefined) {
            throw new runtime.RequiredError('authorizationToken','Required parameter requestParameters.authorizationToken was null or undefined when calling getQuestion.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters.authorizationToken !== undefined && requestParameters.authorizationToken !== null) {
            headerParameters['Authorization_token'] = String(requestParameters.authorizationToken);
        }

        const response = await this.request({
            path: `/question/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     */
    async getQuestion(requestParameters: GetQuestionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<QuestionModel> {
        const response = await this.getQuestionRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async registerQuestionRaw(requestParameters: RegisterQuestionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        if (requestParameters.authorizationToken === null || requestParameters.authorizationToken === undefined) {
            throw new runtime.RequiredError('authorizationToken','Required parameter requestParameters.authorizationToken was null or undefined when calling registerQuestion.');
        }

        if (requestParameters.createQuestionModel === null || requestParameters.createQuestionModel === undefined) {
            throw new runtime.RequiredError('createQuestionModel','Required parameter requestParameters.createQuestionModel was null or undefined when calling registerQuestion.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (requestParameters.authorizationToken !== undefined && requestParameters.authorizationToken !== null) {
            headerParameters['Authorization_token'] = String(requestParameters.authorizationToken);
        }

        const response = await this.request({
            path: `/question`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.createQuestionModel,
        }, initOverrides);

        return new runtime.TextApiResponse(response) as any;
    }

    /**
     */
    async registerQuestion(requestParameters: RegisterQuestionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.registerQuestionRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async updateQuestionRaw(requestParameters: UpdateQuestionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateQuestion.');
        }

        if (requestParameters.authorizationToken === null || requestParameters.authorizationToken === undefined) {
            throw new runtime.RequiredError('authorizationToken','Required parameter requestParameters.authorizationToken was null or undefined when calling updateQuestion.');
        }

        if (requestParameters.updateQuestionModel === null || requestParameters.updateQuestionModel === undefined) {
            throw new runtime.RequiredError('updateQuestionModel','Required parameter requestParameters.updateQuestionModel was null or undefined when calling updateQuestion.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (requestParameters.authorizationToken !== undefined && requestParameters.authorizationToken !== null) {
            headerParameters['Authorization_token'] = String(requestParameters.authorizationToken);
        }

        const response = await this.request({
            path: `/question/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.updateQuestionModel,
        }, initOverrides);

        return new runtime.TextApiResponse(response) as any;
    }

    /**
     */
    async updateQuestion(requestParameters: UpdateQuestionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.updateQuestionRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
