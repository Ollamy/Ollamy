/* tslint:disable */
/* eslint-disable */

import * as runtime from '../runtime';
import type {
  Question,
} from '../models/index';

export interface CreateAndGenerateQuestionRequest {
    lessonId: string;
    numberOfQuestions: any;
    typeOfQuestion: CreateAndGenerateQuestionTypeOfQuestionEnum;
    file?: Blob;
}

export interface GenerateFakeAnswerRequest {
    questionId: string;
    numberWrongAnswers: any;
}

export interface GenerateTextRequest {
    numberOfQuestions: any;
    typeOfQuestion: GenerateTextTypeOfQuestionEnum;
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

        if (requestParameters.typeOfQuestion === null || requestParameters.typeOfQuestion === undefined) {
            throw new runtime.RequiredError('typeOfQuestion','Required parameter requestParameters.typeOfQuestion was null or undefined when calling createAndGenerateQuestion.');
        }

        const queryParameters: any = {};

        if (requestParameters.numberOfQuestions !== undefined) {
            queryParameters['numberOfQuestions'] = requestParameters.numberOfQuestions;
        }

        if (requestParameters.typeOfQuestion !== undefined) {
            queryParameters['typeOfQuestion'] = requestParameters.typeOfQuestion;
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

        if (requestParameters.typeOfQuestion === null || requestParameters.typeOfQuestion === undefined) {
            throw new runtime.RequiredError('typeOfQuestion','Required parameter requestParameters.typeOfQuestion was null or undefined when calling generateText.');
        }

        const queryParameters: any = {};

        if (requestParameters.numberOfQuestions !== undefined) {
            queryParameters['numberOfQuestions'] = requestParameters.numberOfQuestions;
        }

        if (requestParameters.typeOfQuestion !== undefined) {
            queryParameters['typeOfQuestion'] = requestParameters.typeOfQuestion;
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

/**
 * @export
 */
export const CreateAndGenerateQuestionTypeOfQuestionEnum = {
    FreeAnswer: 'FREE_ANSWER',
    MultipleChoice: 'MULTIPLE_CHOICE',
    SquareChoice: 'SQUARE_CHOICE',
    OrderChoice: 'ORDER_CHOICE'
} as const;
export type CreateAndGenerateQuestionTypeOfQuestionEnum = typeof CreateAndGenerateQuestionTypeOfQuestionEnum[keyof typeof CreateAndGenerateQuestionTypeOfQuestionEnum];
/**
 * @export
 */
export const GenerateTextTypeOfQuestionEnum = {
    FreeAnswer: 'FREE_ANSWER',
    MultipleChoice: 'MULTIPLE_CHOICE',
    SquareChoice: 'SQUARE_CHOICE',
    OrderChoice: 'ORDER_CHOICE'
} as const;
export type GenerateTextTypeOfQuestionEnum = typeof GenerateTextTypeOfQuestionEnum[keyof typeof GenerateTextTypeOfQuestionEnum];
