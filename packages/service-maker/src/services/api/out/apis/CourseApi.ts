/* tslint:disable */
/* eslint-disable */

import * as runtime from '../runtime';
import type {
  CourseIdResponse,
  CourseTrueResponse,
  CreateCourseModel,
  GetCourseRequest,
  IdCourseModel,
  SectionModel,
  UpdateCourseModel,
} from '../models/index';

export interface AddUserToCourseRequest {
    id: string;
}

export interface DeleteCourseRequest {
    idCourseModel: IdCourseModel;
}

export interface GetCourseOperationRequest {
    id: string;
}

export interface GetCourseSectionsRequest {
    id: string;
}

export interface PostCourseRequest {
    createCourseModel: CreateCourseModel;
}

export interface UpdateCourseRequest {
    id: string;
    updateCourseModel: UpdateCourseModel;
}

/**
 */
export class CourseApi extends runtime.BaseAPI {

    /**
     */
    async addUserToCourseRaw(requestParameters: AddUserToCourseRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CourseTrueResponse> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling addUserToCourse.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/course/{id}/user`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return response.json();
    }

    /**
     */
    static addUserToCourse(requestParameters: AddUserToCourseRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CourseTrueResponse> {
        return localCourseApi.addUserToCourseRaw(requestParameters, initOverrides);
    }

    /**
     */
    async deleteCourseRaw(requestParameters: DeleteCourseRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CourseIdResponse> {
        if (requestParameters.idCourseModel === null || requestParameters.idCourseModel === undefined) {
            throw new runtime.RequiredError('idCourseModel','Required parameter requestParameters.idCourseModel was null or undefined when calling deleteCourse.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/course`,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.idCourseModel,
        }, initOverrides);

        return response.json();
    }

    /**
     */
    static deleteCourse(requestParameters: DeleteCourseRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CourseIdResponse> {
        return localCourseApi.deleteCourseRaw(requestParameters, initOverrides);
    }

    /**
     */
    async getCourseRaw(requestParameters: GetCourseOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetCourseRequest> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getCourse.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/course/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return response.json();
    }

    /**
     */
    static getCourse(requestParameters: GetCourseOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetCourseRequest> {
        return localCourseApi.getCourseRaw(requestParameters, initOverrides);
    }

    /**
     */
    async getCourseSectionsRaw(requestParameters: GetCourseSectionsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<SectionModel>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getCourseSections.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/course/{id}/sections`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return response.json();
    }

    /**
     */
    static getCourseSections(requestParameters: GetCourseSectionsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<SectionModel>> {
        return localCourseApi.getCourseSectionsRaw(requestParameters, initOverrides);
    }

    /**
     */
    async postCourseRaw(requestParameters: PostCourseRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CourseIdResponse> {
        if (requestParameters.createCourseModel === null || requestParameters.createCourseModel === undefined) {
            throw new runtime.RequiredError('createCourseModel','Required parameter requestParameters.createCourseModel was null or undefined when calling postCourse.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/course`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.createCourseModel,
        }, initOverrides);

        return response.json();
    }

    /**
     */
    static postCourse(requestParameters: PostCourseRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CourseIdResponse> {
        return localCourseApi.postCourseRaw(requestParameters, initOverrides);
    }

    /**
     */
    async updateCourseRaw(requestParameters: UpdateCourseRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CourseIdResponse> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateCourse.');
        }

        if (requestParameters.updateCourseModel === null || requestParameters.updateCourseModel === undefined) {
            throw new runtime.RequiredError('updateCourseModel','Required parameter requestParameters.updateCourseModel was null or undefined when calling updateCourse.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/course/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.updateCourseModel,
        }, initOverrides);

        return response.json();
    }

    /**
     */
    static updateCourse(requestParameters: UpdateCourseRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CourseIdResponse> {
        return localCourseApi.updateCourseRaw(requestParameters, initOverrides);
    }

}

const localCourseApi = new CourseApi();
