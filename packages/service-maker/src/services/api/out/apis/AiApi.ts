/* tslint:disable */
/* eslint-disable */

import * as runtime from '../runtime';
import type {
  CourseTrueResponse,
  Question,
} from '../models/index';

export interface CreateAndGenerateQuestionRequest {
    lessonId: string;
    numberOfQuestions: any;
    file?: Blob;
}

export interface CreateQuestionRequest {
    lessonId: string;
    question: Array<Question>;
}

export interface GenerateFakeAnswerRequest {
    questionId: string;
    numberWrongAnswers: any;
}

export interface GenerateTextRequest {
    numberOfQuestions: any;
    file?: Blob;
}

/**
 */
export class AiApi extends runtime.BaseAPI {

    /**
     */
    async createAndGenerateQuestionRaw(requestParameters: CreateAndGenerateQuestionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<Question>> {
        if (requestParameters.lessonId === null || requestParameters.lessonId === undefined) {
            throw new runtime.RequiredError('lessonId','Required parameter requestParameters.lessonId was null or undefined when calling createAndGenerateQuestion.');
        }

        if (requestParameters.numberOfQuestions === null || requestParameters.numberOfQuestions === undefined) {
            throw new runtime.RequiredError('numberOfQuestions','Required parameter requestParameters.numberOfQuestions was null or undefined when calling createAndGenerateQuestion.');
        }

        const queryParameters: any = {};

        if (requestParameters.numberOfQuestions !== undefined) {
            queryParameters['numberOfQuestions'] = requestParameters.numberOfQuestions;
        }

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
            path: `/ai/create-and-generate-question/{lessonId}`.replace(`{${"lessonId"}}`, encodeURIComponent(String(requestParameters.lessonId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: formParams,
        }, initOverrides);

        return response.json();
    }

    /**
     */
    static createAndGenerateQuestion(requestParameters: CreateAndGenerateQuestionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<Question>> {
        return localAiApi.createAndGenerateQuestionRaw(requestParameters, initOverrides);
    }

    /**
     */
    async createQuestionRaw(requestParameters: CreateQuestionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CourseTrueResponse> {
        if (requestParameters.lessonId === null || requestParameters.lessonId === undefined) {
            throw new runtime.RequiredError('lessonId','Required parameter requestParameters.lessonId was null or undefined when calling createQuestion.');
        }

        if (requestParameters.question === null || requestParameters.question === undefined) {
            throw new runtime.RequiredError('question','Required parameter requestParameters.question was null or undefined when calling createQuestion.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/ai/create-generated-question/{lessonId}`.replace(`{${"lessonId"}}`, encodeURIComponent(String(requestParameters.lessonId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.question,
        }, initOverrides);

        return response.json();
    }

    /**
     */
    static createQuestion(requestParameters: CreateQuestionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CourseTrueResponse> {
        return localAiApi.createQuestionRaw(requestParameters, initOverrides);
    }

    /**
     */
    async generateFakeAnswerRaw(requestParameters: GenerateFakeAnswerRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        if (requestParameters.questionId === null || requestParameters.questionId === undefined) {
            throw new runtime.RequiredError('questionId','Required parameter requestParameters.questionId was null or undefined when calling generateFakeAnswer.');
        }

        if (requestParameters.numberWrongAnswers === null || requestParameters.numberWrongAnswers === undefined) {
            throw new runtime.RequiredError('numberWrongAnswers','Required parameter requestParameters.numberWrongAnswers was null or undefined when calling generateFakeAnswer.');
        }

        const queryParameters: any = {};

        if (requestParameters.numberWrongAnswers !== undefined) {
            queryParameters['numberWrongAnswers'] = requestParameters.numberWrongAnswers;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/ai/generate-fake-answer/{questionId}`.replace(`{${"questionId"}}`, encodeURIComponent(String(requestParameters.questionId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

    }

    /**
     */
    static generateFakeAnswer(requestParameters: GenerateFakeAnswerRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        return localAiApi.generateFakeAnswerRaw(requestParameters, initOverrides);
    }

    /**
     */
    async generateTextRaw(requestParameters: GenerateTextRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<Question>> {
        if (requestParameters.numberOfQuestions === null || requestParameters.numberOfQuestions === undefined) {
            throw new runtime.RequiredError('numberOfQuestions','Required parameter requestParameters.numberOfQuestions was null or undefined when calling generateText.');
        }

        const queryParameters: any = {};

        if (requestParameters.numberOfQuestions !== undefined) {
            queryParameters['numberOfQuestions'] = requestParameters.numberOfQuestions;
        }

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
    static generateText(requestParameters: GenerateTextRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<Question>> {
        return localAiApi.generateTextRaw(requestParameters, initOverrides);
    }

}

const localAiApi = new AiApi();
