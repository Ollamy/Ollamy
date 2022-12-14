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
  ChapterModel,
  CreateChapterModel,
  IdChapterModel,
  LessonModel,
  UpdateChapterModel,
} from '../models';

export interface DeleteChapterRequest {
    authorizationToken: string;
    idChapterModel: IdChapterModel;
}

export interface GetChapterRequest {
    id: string;
    authorizationToken: string;
}

export interface GetChapterLessonsRequest {
    id: string;
    authorizationToken: string;
}

export interface RegisterChapterRequest {
    authorizationToken: string;
    createChapterModel: CreateChapterModel;
}

export interface UpdateChapterRequest {
    id: string;
    authorizationToken: string;
    updateChapterModel: UpdateChapterModel;
}

/**
 * 
 */
export class ChapterApi extends runtime.BaseAPI {

    /**
     */
    async deleteChapterRaw(requestParameters: DeleteChapterRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        if (requestParameters.authorizationToken === null || requestParameters.authorizationToken === undefined) {
            throw new runtime.RequiredError('authorizationToken','Required parameter requestParameters.authorizationToken was null or undefined when calling deleteChapter.');
        }

        if (requestParameters.idChapterModel === null || requestParameters.idChapterModel === undefined) {
            throw new runtime.RequiredError('idChapterModel','Required parameter requestParameters.idChapterModel was null or undefined when calling deleteChapter.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (requestParameters.authorizationToken !== undefined && requestParameters.authorizationToken !== null) {
            headerParameters['Authorization_token'] = String(requestParameters.authorizationToken);
        }

        const response = await this.request({
            path: `/chapter`,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.idChapterModel,
        }, initOverrides);

        return new runtime.TextApiResponse(response) as any;
    }

    /**
     */
    async deleteChapter(requestParameters: DeleteChapterRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.deleteChapterRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async getChapterRaw(requestParameters: GetChapterRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ChapterModel>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getChapter.');
        }

        if (requestParameters.authorizationToken === null || requestParameters.authorizationToken === undefined) {
            throw new runtime.RequiredError('authorizationToken','Required parameter requestParameters.authorizationToken was null or undefined when calling getChapter.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters.authorizationToken !== undefined && requestParameters.authorizationToken !== null) {
            headerParameters['Authorization_token'] = String(requestParameters.authorizationToken);
        }

        const response = await this.request({
            path: `/chapter/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     */
    async getChapter(requestParameters: GetChapterRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ChapterModel> {
        const response = await this.getChapterRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async getChapterLessonsRaw(requestParameters: GetChapterLessonsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<LessonModel>>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getChapterLessons.');
        }

        if (requestParameters.authorizationToken === null || requestParameters.authorizationToken === undefined) {
            throw new runtime.RequiredError('authorizationToken','Required parameter requestParameters.authorizationToken was null or undefined when calling getChapterLessons.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters.authorizationToken !== undefined && requestParameters.authorizationToken !== null) {
            headerParameters['Authorization_token'] = String(requestParameters.authorizationToken);
        }

        const response = await this.request({
            path: `/chapter/lessons/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     */
    async getChapterLessons(requestParameters: GetChapterLessonsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<LessonModel>> {
        const response = await this.getChapterLessonsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async registerChapterRaw(requestParameters: RegisterChapterRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        if (requestParameters.authorizationToken === null || requestParameters.authorizationToken === undefined) {
            throw new runtime.RequiredError('authorizationToken','Required parameter requestParameters.authorizationToken was null or undefined when calling registerChapter.');
        }

        if (requestParameters.createChapterModel === null || requestParameters.createChapterModel === undefined) {
            throw new runtime.RequiredError('createChapterModel','Required parameter requestParameters.createChapterModel was null or undefined when calling registerChapter.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (requestParameters.authorizationToken !== undefined && requestParameters.authorizationToken !== null) {
            headerParameters['Authorization_token'] = String(requestParameters.authorizationToken);
        }

        const response = await this.request({
            path: `/chapter`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.createChapterModel,
        }, initOverrides);

        return new runtime.TextApiResponse(response) as any;
    }

    /**
     */
    async registerChapter(requestParameters: RegisterChapterRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.registerChapterRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async updateChapterRaw(requestParameters: UpdateChapterRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateChapter.');
        }

        if (requestParameters.authorizationToken === null || requestParameters.authorizationToken === undefined) {
            throw new runtime.RequiredError('authorizationToken','Required parameter requestParameters.authorizationToken was null or undefined when calling updateChapter.');
        }

        if (requestParameters.updateChapterModel === null || requestParameters.updateChapterModel === undefined) {
            throw new runtime.RequiredError('updateChapterModel','Required parameter requestParameters.updateChapterModel was null or undefined when calling updateChapter.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (requestParameters.authorizationToken !== undefined && requestParameters.authorizationToken !== null) {
            headerParameters['Authorization_token'] = String(requestParameters.authorizationToken);
        }

        const response = await this.request({
            path: `/chapter/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.updateChapterModel,
        }, initOverrides);

        return new runtime.TextApiResponse(response) as any;
    }

    /**
     */
    async updateChapter(requestParameters: UpdateChapterRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.updateChapterRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
