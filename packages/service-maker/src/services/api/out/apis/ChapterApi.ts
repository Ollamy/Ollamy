/* tslint:disable */
/* eslint-disable */

import * as runtime from '../runtime';
import type {
  ChapterModel,
  CreateChapterModel,
  IdChapterModel,
  LessonModel,
  UpdateChapterModel,
} from '../models/index';

export interface DeleteChapterRequest {
    idChapterModel: IdChapterModel;
}

export interface GetChapterRequest {
    id: string;
}

export interface GetChapterLessonsRequest {
    id: string;
}

export interface RegisterChapterRequest {
    createChapterModel: CreateChapterModel;
}

export interface UpdateChapterRequest {
    id: string;
    updateChapterModel: UpdateChapterModel;
}

/**
 */
export class ChapterApi extends runtime.BaseAPI {

    /**
     */
    async deleteChapterRaw(requestParameters: DeleteChapterRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        if (requestParameters.idChapterModel === null || requestParameters.idChapterModel === undefined) {
            throw new runtime.RequiredError('idChapterModel','Required parameter requestParameters.idChapterModel was null or undefined when calling deleteChapter.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/chapter`,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.idChapterModel,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return response.json();
        } else {
            return response.text();
        }
    }

    /**
     */
    static deleteChapter(requestParameters: DeleteChapterRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        return localChapterApi.deleteChapterRaw(requestParameters, initOverrides);
    }

    /**
     */
    async getChapterRaw(requestParameters: GetChapterRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ChapterModel> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getChapter.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/chapter/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return response.json();
    }

    /**
     */
    static getChapter(requestParameters: GetChapterRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ChapterModel> {
        return localChapterApi.getChapterRaw(requestParameters, initOverrides);
    }

    /**
     */
    async getChapterLessonsRaw(requestParameters: GetChapterLessonsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<LessonModel>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getChapterLessons.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/chapter/lessons/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return response.json();
    }

    /**
     */
    static getChapterLessons(requestParameters: GetChapterLessonsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<LessonModel>> {
        return localChapterApi.getChapterLessonsRaw(requestParameters, initOverrides);
    }

    /**
     */
    async registerChapterRaw(requestParameters: RegisterChapterRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        if (requestParameters.createChapterModel === null || requestParameters.createChapterModel === undefined) {
            throw new runtime.RequiredError('createChapterModel','Required parameter requestParameters.createChapterModel was null or undefined when calling registerChapter.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/chapter`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.createChapterModel,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return response.json();
        } else {
            return response.text();
        }
    }

    /**
     */
    static registerChapter(requestParameters: RegisterChapterRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        return localChapterApi.registerChapterRaw(requestParameters, initOverrides);
    }

    /**
     */
    async updateChapterRaw(requestParameters: UpdateChapterRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateChapter.');
        }

        if (requestParameters.updateChapterModel === null || requestParameters.updateChapterModel === undefined) {
            throw new runtime.RequiredError('updateChapterModel','Required parameter requestParameters.updateChapterModel was null or undefined when calling updateChapter.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/chapter/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.updateChapterModel,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return response.json();
        } else {
            return response.text();
        }
    }

    /**
     */
    static updateChapter(requestParameters: UpdateChapterRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        return localChapterApi.updateChapterRaw(requestParameters, initOverrides);
    }

}

const localChapterApi = new ChapterApi();
