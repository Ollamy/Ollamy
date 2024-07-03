/* tslint:disable */
/* eslint-disable */

import * as runtime from '../runtime';
import type {
  CreateQuestionResponse,
  QuestionResponse,
} from '../models/index';

export interface CreateQuestionRequest {
    createQuestionResponse: CreateQuestionResponse;
}

export interface GenerateTextRequest {
    file?: Blob;
}

/**
 */
export class AiApi extends runtime.BaseAPI {

    /**
     */
    async createQuestionRaw(requestParameters: CreateQuestionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<boolean> {
        if (requestParameters.createQuestionResponse === null || requestParameters.createQuestionResponse === undefined) {
            throw new runtime.RequiredError('createQuestionResponse','Required parameter requestParameters.createQuestionResponse was null or undefined when calling createQuestion.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/ai/create-generated-question`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.createQuestionResponse,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return response.json();
        } else {
            return response.text();
        }
    }

    /**
     */
    static createQuestion(requestParameters: CreateQuestionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<boolean> {
        return localAiApi.createQuestionRaw(requestParameters, initOverrides);
    }

    /**
     */
    async generateTextRaw(requestParameters: GenerateTextRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<QuestionResponse> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const consumes: runtime.Consume[] = [
            { contentType: 'multipart/form-data' },
        ];
        // @ts-ignore: canConsumeForm may be unused
        const canConsumeForm = runtime.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): any };
        let useForm = false;
        // use FormData to transmit files using content-type "multipart/form-data"
        useForm = canConsumeForm;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new URLSearchParams();
        }

        if (requestParameters.file !== undefined) {
            formParams.append('file', requestParameters.file as any);
        }

        const response = await this.request({
            path: `/ai/generate-question`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: formParams,
        }, initOverrides);

        return response.json();
    }

    /**
     */
    static generateText(requestParameters: GenerateTextRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<QuestionResponse> {
        return localAiApi.generateTextRaw(requestParameters, initOverrides);
    }

}

const localAiApi = new AiApi();
