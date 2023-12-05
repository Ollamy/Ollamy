/* tslint:disable */
/* eslint-disable */

import * as runtime from '../runtime';
import type {
  CreateQuestionModel,
  IdQuestionModel,
  QuestionModel,
  UpdateQuestionModel,
} from '../models/index';

export interface DeleteQuestionRequest {
    idQuestionModel: IdQuestionModel;
}

export interface GetQuestionRequest {
    id: string;
}

export interface GetQuestionAnswersRequest {
    id: string;
}

export interface RegisterQuestionRequest {
    createQuestionModel: CreateQuestionModel;
}

export interface UpdateQuestionRequest {
    id: string;
    updateQuestionModel: UpdateQuestionModel;
}

/**
 */
export class QuestionApi extends runtime.BaseAPI {

    /**
     */
    async deleteQuestionRaw(requestParameters: DeleteQuestionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        if (requestParameters.idQuestionModel === null || requestParameters.idQuestionModel === undefined) {
            throw new runtime.RequiredError('idQuestionModel','Required parameter requestParameters.idQuestionModel was null or undefined when calling deleteQuestion.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/question`,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.idQuestionModel,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return response.json();
        } else {
            return response.text();
        }
    }

    /**
     */
    static deleteQuestion(requestParameters: DeleteQuestionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        return localQuestionApi.deleteQuestionRaw(requestParameters, initOverrides);
    }

    /**
     */
    async getQuestionRaw(requestParameters: GetQuestionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<QuestionModel> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getQuestion.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/question/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return response.json();
    }

    /**
     */
    static getQuestion(requestParameters: GetQuestionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<QuestionModel> {
        return localQuestionApi.getQuestionRaw(requestParameters, initOverrides);
    }

    /**
     */
    async getQuestionAnswersRaw(requestParameters: GetQuestionAnswersRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<QuestionModel> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getQuestionAnswers.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/question/{id}/answers`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return response.json();
    }

    /**
     */
    static getQuestionAnswers(requestParameters: GetQuestionAnswersRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<QuestionModel> {
        return localQuestionApi.getQuestionAnswersRaw(requestParameters, initOverrides);
    }

    /**
     */
    async registerQuestionRaw(requestParameters: RegisterQuestionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        if (requestParameters.createQuestionModel === null || requestParameters.createQuestionModel === undefined) {
            throw new runtime.RequiredError('createQuestionModel','Required parameter requestParameters.createQuestionModel was null or undefined when calling registerQuestion.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/question`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.createQuestionModel,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return response.json();
        } else {
            return response.text();
        }
    }

    /**
     */
    static registerQuestion(requestParameters: RegisterQuestionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        return localQuestionApi.registerQuestionRaw(requestParameters, initOverrides);
    }

    /**
     */
    async updateQuestionRaw(requestParameters: UpdateQuestionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateQuestion.');
        }

        if (requestParameters.updateQuestionModel === null || requestParameters.updateQuestionModel === undefined) {
            throw new runtime.RequiredError('updateQuestionModel','Required parameter requestParameters.updateQuestionModel was null or undefined when calling updateQuestion.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/question/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.updateQuestionModel,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return response.json();
        } else {
            return response.text();
        }
    }

    /**
     */
    static updateQuestion(requestParameters: UpdateQuestionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        return localQuestionApi.updateQuestionRaw(requestParameters, initOverrides);
    }

}

const localQuestionApi = new QuestionApi();
