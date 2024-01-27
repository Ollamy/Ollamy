/* tslint:disable */
/* eslint-disable */

import * as runtime from '../runtime';
import type {
  CreateLectureModel,
  IdLectureModel,
  LectureIdResponse,
  LectureModel,
  UpdateLectureModel,
} from '../models/index';

export interface CreateLectureRequest {
    createLectureModel: CreateLectureModel;
}

export interface DeleteLectureRequest {
    idLectureModel: IdLectureModel;
}

export interface GetLectureRequest {
    id: string;
}

export interface UpdateLectureRequest {
    id: string;
    updateLectureModel: UpdateLectureModel;
}

/**
 */
export class LectureApi extends runtime.BaseAPI {

    /**
     */
    async createLectureRaw(requestParameters: CreateLectureRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<LectureIdResponse> {
        if (requestParameters.createLectureModel === null || requestParameters.createLectureModel === undefined) {
            throw new runtime.RequiredError('createLectureModel','Required parameter requestParameters.createLectureModel was null or undefined when calling createLecture.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/lecture`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.createLectureModel,
        }, initOverrides);

        return response.json();
    }

    /**
     */
    static createLecture(requestParameters: CreateLectureRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<LectureIdResponse> {
        return localLectureApi.createLectureRaw(requestParameters, initOverrides);
    }

    /**
     */
    async deleteLectureRaw(requestParameters: DeleteLectureRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<LectureIdResponse> {
        if (requestParameters.idLectureModel === null || requestParameters.idLectureModel === undefined) {
            throw new runtime.RequiredError('idLectureModel','Required parameter requestParameters.idLectureModel was null or undefined when calling deleteLecture.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/lecture`,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.idLectureModel,
        }, initOverrides);

        return response.json();
    }

    /**
     */
    static deleteLecture(requestParameters: DeleteLectureRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<LectureIdResponse> {
        return localLectureApi.deleteLectureRaw(requestParameters, initOverrides);
    }

    /**
     */
    async getLectureRaw(requestParameters: GetLectureRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<LectureModel> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getLecture.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/lecture/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return response.json();
    }

    /**
     */
    static getLecture(requestParameters: GetLectureRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<LectureModel> {
        return localLectureApi.getLectureRaw(requestParameters, initOverrides);
    }

    /**
     */
    async updateLectureRaw(requestParameters: UpdateLectureRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<LectureIdResponse> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateLecture.');
        }

        if (requestParameters.updateLectureModel === null || requestParameters.updateLectureModel === undefined) {
            throw new runtime.RequiredError('updateLectureModel','Required parameter requestParameters.updateLectureModel was null or undefined when calling updateLecture.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/lecture/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.updateLectureModel,
        }, initOverrides);

        return response.json();
    }

    /**
     */
    static updateLecture(requestParameters: UpdateLectureRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<LectureIdResponse> {
        return localLectureApi.updateLectureRaw(requestParameters, initOverrides);
    }

}

const localLectureApi = new LectureApi();
