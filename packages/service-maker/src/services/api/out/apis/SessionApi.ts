/* tslint:disable */
/* eslint-disable */

import * as runtime from '../runtime';
import type {
  ValidateQuestionSessionModel,
} from '../models/index';

export interface CreateRequest {
    lessonId: string;
}

export interface GetSessionRequest {
    sessionId: string;
}

export interface ValidateQuestionRequest {
    sessionId: string;
    validateQuestionSessionModel: ValidateQuestionSessionModel;
}

/**
 */
export class SessionApi extends runtime.BaseAPI {

    /**
     */
    async createRaw(requestParameters: CreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        if (requestParameters.lessonId === null || requestParameters.lessonId === undefined) {
            throw new runtime.RequiredError('lessonId','Required parameter requestParameters.lessonId was null or undefined when calling create.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/session/create/{lessonId}`.replace(`{${"lessonId"}}`, encodeURIComponent(String(requestParameters.lessonId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

    }

    /**
     */
    static create(requestParameters: CreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        return localSessionApi.createRaw(requestParameters, initOverrides);
    }

    /**
     */
    async getSessionRaw(requestParameters: GetSessionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        if (requestParameters.sessionId === null || requestParameters.sessionId === undefined) {
            throw new runtime.RequiredError('sessionId','Required parameter requestParameters.sessionId was null or undefined when calling getSession.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/session/{sessionId}`.replace(`{${"sessionId"}}`, encodeURIComponent(String(requestParameters.sessionId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

    }

    /**
     */
    static getSession(requestParameters: GetSessionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        return localSessionApi.getSessionRaw(requestParameters, initOverrides);
    }

    /**
     */
    async validateQuestionRaw(requestParameters: ValidateQuestionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        if (requestParameters.sessionId === null || requestParameters.sessionId === undefined) {
            throw new runtime.RequiredError('sessionId','Required parameter requestParameters.sessionId was null or undefined when calling validateQuestion.');
        }

        if (requestParameters.validateQuestionSessionModel === null || requestParameters.validateQuestionSessionModel === undefined) {
            throw new runtime.RequiredError('validateQuestionSessionModel','Required parameter requestParameters.validateQuestionSessionModel was null or undefined when calling validateQuestion.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/session/validate-question/{sessionId}`.replace(`{${"sessionId"}}`, encodeURIComponent(String(requestParameters.sessionId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.validateQuestionSessionModel,
        }, initOverrides);

    }

    /**
     */
    static validateQuestion(requestParameters: ValidateQuestionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        return localSessionApi.validateQuestionRaw(requestParameters, initOverrides);
    }

}

const localSessionApi = new SessionApi();
