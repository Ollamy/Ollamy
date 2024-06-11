/* tslint:disable */
/* eslint-disable */

import * as runtime from '../runtime';
import type {
  CreateSectionModel,
  GetSectionModel,
  IdSectionModel,
  LessonModel,
  SectionIdResponse,
  UpdateSectionModel,
} from '../models/index';

export interface DeleteSectionRequest {
    idSectionModel: IdSectionModel;
}

export interface GetSectionRequest {
    id: string;
}

export interface GetSectionLessonsRequest {
    id: string;
}

export interface JoinLessonRequest {
    id: string;
}

export interface RegisterSectionRequest {
    createSectionModel: CreateSectionModel;
}

export interface UpdateSectionRequest {
    id: string;
    updateSectionModel: UpdateSectionModel;
}

/**
 */
export class SectionApi extends runtime.BaseAPI {

    /**
     */
    async deleteSectionRaw(requestParameters: DeleteSectionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SectionIdResponse> {
        if (requestParameters.idSectionModel === null || requestParameters.idSectionModel === undefined) {
            throw new runtime.RequiredError('idSectionModel','Required parameter requestParameters.idSectionModel was null or undefined when calling deleteSection.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/section`,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.idSectionModel,
        }, initOverrides);

        return response.json();
    }

    /**
     */
    static deleteSection(requestParameters: DeleteSectionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SectionIdResponse> {
        return localSectionApi.deleteSectionRaw(requestParameters, initOverrides);
    }

    /**
     */
    async getSectionRaw(requestParameters: GetSectionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetSectionModel> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getSection.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/section/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return response.json();
    }

    /**
     */
    static getSection(requestParameters: GetSectionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetSectionModel> {
        return localSectionApi.getSectionRaw(requestParameters, initOverrides);
    }

    /**
     */
    async getSectionLessonsRaw(requestParameters: GetSectionLessonsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<LessonModel>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getSectionLessons.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/section/lessons/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return response.json();
    }

    /**
     */
    static getSectionLessons(requestParameters: GetSectionLessonsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<LessonModel>> {
        return localSectionApi.getSectionLessonsRaw(requestParameters, initOverrides);
    }

    /**
     */
    async joinLessonRaw(requestParameters: JoinLessonRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SectionIdResponse> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling joinLesson.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/section/{id}/join`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return response.json();
    }

    /**
     */
    static joinLesson(requestParameters: JoinLessonRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SectionIdResponse> {
        return localSectionApi.joinLessonRaw(requestParameters, initOverrides);
    }

    /**
     */
    async registerSectionRaw(requestParameters: RegisterSectionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SectionIdResponse> {
        if (requestParameters.createSectionModel === null || requestParameters.createSectionModel === undefined) {
            throw new runtime.RequiredError('createSectionModel','Required parameter requestParameters.createSectionModel was null or undefined when calling registerSection.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/section`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.createSectionModel,
        }, initOverrides);

        return response.json();
    }

    /**
     */
    static registerSection(requestParameters: RegisterSectionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SectionIdResponse> {
        return localSectionApi.registerSectionRaw(requestParameters, initOverrides);
    }

    /**
     */
    async updateSectionRaw(requestParameters: UpdateSectionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SectionIdResponse> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateSection.');
        }

        if (requestParameters.updateSectionModel === null || requestParameters.updateSectionModel === undefined) {
            throw new runtime.RequiredError('updateSectionModel','Required parameter requestParameters.updateSectionModel was null or undefined when calling updateSection.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/section/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.updateSectionModel,
        }, initOverrides);

        return response.json();
    }

    /**
     */
    static updateSection(requestParameters: UpdateSectionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SectionIdResponse> {
        return localSectionApi.updateSectionRaw(requestParameters, initOverrides);
    }

}

const localSectionApi = new SectionApi();
