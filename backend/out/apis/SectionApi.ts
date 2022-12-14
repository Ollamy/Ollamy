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
  CreateSectionModel,
  IdSectionModel,
  SectionModel,
  UpdateSectionModel,
} from '../models';

export interface DeleteSectionRequest {
    authorizationToken: string;
    idSectionModel: IdSectionModel;
}

export interface GetSectionRequest {
    id: string;
    authorizationToken: string;
}

export interface GetSectionChaptersRequest {
    id: string;
    authorizationToken: string;
}

export interface RegisterSectionRequest {
    authorizationToken: string;
    createSectionModel: CreateSectionModel;
}

export interface UpdateSectionRequest {
    id: string;
    authorizationToken: string;
    updateSectionModel: UpdateSectionModel;
}

/**
 * 
 */
export class SectionApi extends runtime.BaseAPI {

    /**
     */
    async deleteSectionRaw(requestParameters: DeleteSectionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        if (requestParameters.authorizationToken === null || requestParameters.authorizationToken === undefined) {
            throw new runtime.RequiredError('authorizationToken','Required parameter requestParameters.authorizationToken was null or undefined when calling deleteSection.');
        }

        if (requestParameters.idSectionModel === null || requestParameters.idSectionModel === undefined) {
            throw new runtime.RequiredError('idSectionModel','Required parameter requestParameters.idSectionModel was null or undefined when calling deleteSection.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (requestParameters.authorizationToken !== undefined && requestParameters.authorizationToken !== null) {
            headerParameters['Authorization_token'] = String(requestParameters.authorizationToken);
        }

        const response = await this.request({
            path: `/section`,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.idSectionModel,
        }, initOverrides);

        return new runtime.TextApiResponse(response) as any;
    }

    /**
     */
    async deleteSection(requestParameters: DeleteSectionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.deleteSectionRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async getSectionRaw(requestParameters: GetSectionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<SectionModel>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getSection.');
        }

        if (requestParameters.authorizationToken === null || requestParameters.authorizationToken === undefined) {
            throw new runtime.RequiredError('authorizationToken','Required parameter requestParameters.authorizationToken was null or undefined when calling getSection.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters.authorizationToken !== undefined && requestParameters.authorizationToken !== null) {
            headerParameters['Authorization_token'] = String(requestParameters.authorizationToken);
        }

        const response = await this.request({
            path: `/section/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     */
    async getSection(requestParameters: GetSectionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SectionModel> {
        const response = await this.getSectionRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async getSectionChaptersRaw(requestParameters: GetSectionChaptersRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<ChapterModel>>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getSectionChapters.');
        }

        if (requestParameters.authorizationToken === null || requestParameters.authorizationToken === undefined) {
            throw new runtime.RequiredError('authorizationToken','Required parameter requestParameters.authorizationToken was null or undefined when calling getSectionChapters.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters.authorizationToken !== undefined && requestParameters.authorizationToken !== null) {
            headerParameters['Authorization_token'] = String(requestParameters.authorizationToken);
        }

        const response = await this.request({
            path: `/section/chapters/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     */
    async getSectionChapters(requestParameters: GetSectionChaptersRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<ChapterModel>> {
        const response = await this.getSectionChaptersRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async registerSectionRaw(requestParameters: RegisterSectionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        if (requestParameters.authorizationToken === null || requestParameters.authorizationToken === undefined) {
            throw new runtime.RequiredError('authorizationToken','Required parameter requestParameters.authorizationToken was null or undefined when calling registerSection.');
        }

        if (requestParameters.createSectionModel === null || requestParameters.createSectionModel === undefined) {
            throw new runtime.RequiredError('createSectionModel','Required parameter requestParameters.createSectionModel was null or undefined when calling registerSection.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (requestParameters.authorizationToken !== undefined && requestParameters.authorizationToken !== null) {
            headerParameters['Authorization_token'] = String(requestParameters.authorizationToken);
        }

        const response = await this.request({
            path: `/section`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.createSectionModel,
        }, initOverrides);

        return new runtime.TextApiResponse(response) as any;
    }

    /**
     */
    async registerSection(requestParameters: RegisterSectionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.registerSectionRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async updateSectionRaw(requestParameters: UpdateSectionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateSection.');
        }

        if (requestParameters.authorizationToken === null || requestParameters.authorizationToken === undefined) {
            throw new runtime.RequiredError('authorizationToken','Required parameter requestParameters.authorizationToken was null or undefined when calling updateSection.');
        }

        if (requestParameters.updateSectionModel === null || requestParameters.updateSectionModel === undefined) {
            throw new runtime.RequiredError('updateSectionModel','Required parameter requestParameters.updateSectionModel was null or undefined when calling updateSection.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (requestParameters.authorizationToken !== undefined && requestParameters.authorizationToken !== null) {
            headerParameters['Authorization_token'] = String(requestParameters.authorizationToken);
        }

        const response = await this.request({
            path: `/section/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.updateSectionModel,
        }, initOverrides);

        return new runtime.TextApiResponse(response) as any;
    }

    /**
     */
    async updateSection(requestParameters: UpdateSectionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.updateSectionRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
