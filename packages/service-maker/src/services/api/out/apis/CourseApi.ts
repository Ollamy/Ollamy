/* tslint:disable */
/* eslint-disable */

import * as runtime from '../runtime';
import type {
  CourseModel,
  CreateCourseModel,
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

export interface GetCourseRequest {
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
    async addUserToCourseRaw(requestParameters: AddUserToCourseRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling addUserToCourse.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/course/user/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return response.json();
        } else {
            return response.text();
        }
    }

    /**
     */
    static addUserToCourse(requestParameters: AddUserToCourseRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        return localCourseApi.addUserToCourseRaw(requestParameters, initOverrides);
    }

    /**
     */
    async deleteCourseRaw(requestParameters: DeleteCourseRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
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

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return response.json();
        } else {
            return response.text();
        }
    }

    /**
     */
    static deleteCourse(requestParameters: DeleteCourseRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        return localCourseApi.deleteCourseRaw(requestParameters, initOverrides);
    }

    /**
     */
    async getCourseRaw(requestParameters: GetCourseRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CourseModel> {
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
    static getCourse(requestParameters: GetCourseRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CourseModel> {
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
            path: `/course/sections/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
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
    async postCourseRaw(requestParameters: PostCourseRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
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

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return response.json();
        } else {
            return response.text();
        }
    }

    /**
     */
    static postCourse(requestParameters: PostCourseRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        return localCourseApi.postCourseRaw(requestParameters, initOverrides);
    }

    /**
     */
    async updateCourseRaw(requestParameters: UpdateCourseRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
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

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return response.json();
        } else {
            return response.text();
        }
    }

    /**
     */
    static updateCourse(requestParameters: UpdateCourseRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        return localCourseApi.updateCourseRaw(requestParameters, initOverrides);
    }

}

const localCourseApi = new CourseApi();
