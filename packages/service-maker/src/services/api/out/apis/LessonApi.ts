/* tslint:disable */
/* eslint-disable */

import * as runtime from '../runtime';
import type {
  CreateLessonModel,
  IdLessonModel,
  LessonModel,
  QuestionModel,
} from '../models/index';

export interface DeleteLessonRequest {
    idLessonModel: IdLessonModel;
}

export interface GetLessonRequest {
    id: string;
}

export interface GetLessonQuestionsRequest {
    id: string;
}

export interface RegisterLessonRequest {
    createLessonModel: CreateLessonModel;
}

export interface UpdateLessonRequest {
    id: string;
    lessonModel: LessonModel;
}

/**
 */
export class LessonApi extends runtime.BaseAPI {

    /**
     */
    async deleteLessonRaw(requestParameters: DeleteLessonRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        if (requestParameters.idLessonModel === null || requestParameters.idLessonModel === undefined) {
            throw new runtime.RequiredError('idLessonModel','Required parameter requestParameters.idLessonModel was null or undefined when calling deleteLesson.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/lesson`,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.idLessonModel,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return response.json();
        } else {
            return response.text();
        }
    }

    /**
     */
    static deleteLesson(requestParameters: DeleteLessonRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        return localLessonApi.deleteLessonRaw(requestParameters, initOverrides);
    }

    /**
     */
    async getLessonRaw(requestParameters: GetLessonRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<LessonModel> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getLesson.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/lesson/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return response.json();
    }

    /**
     */
    static getLesson(requestParameters: GetLessonRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<LessonModel> {
        return localLessonApi.getLessonRaw(requestParameters, initOverrides);
    }

    /**
     */
    async getLessonQuestionsRaw(requestParameters: GetLessonQuestionsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<QuestionModel>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getLessonQuestions.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/lesson/questions/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return response.json();
    }

    /**
     */
    static getLessonQuestions(requestParameters: GetLessonQuestionsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<QuestionModel>> {
        return localLessonApi.getLessonQuestionsRaw(requestParameters, initOverrides);
    }

    /**
     */
    async registerLessonRaw(requestParameters: RegisterLessonRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        if (requestParameters.createLessonModel === null || requestParameters.createLessonModel === undefined) {
            throw new runtime.RequiredError('createLessonModel','Required parameter requestParameters.createLessonModel was null or undefined when calling registerLesson.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/lesson`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.createLessonModel,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return response.json();
        } else {
            return response.text();
        }
    }

    /**
     */
    static registerLesson(requestParameters: RegisterLessonRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        return localLessonApi.registerLessonRaw(requestParameters, initOverrides);
    }

    /**
     */
    async updateLessonRaw(requestParameters: UpdateLessonRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateLesson.');
        }

        if (requestParameters.lessonModel === null || requestParameters.lessonModel === undefined) {
            throw new runtime.RequiredError('lessonModel','Required parameter requestParameters.lessonModel was null or undefined when calling updateLesson.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/lesson/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.lessonModel,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return response.json();
        } else {
            return response.text();
        }
    }

    /**
     */
    static updateLesson(requestParameters: UpdateLessonRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        return localLessonApi.updateLessonRaw(requestParameters, initOverrides);
    }

}

const localLessonApi = new LessonApi();
