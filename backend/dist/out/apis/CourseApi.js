"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseApi = void 0;
const runtime = require("../runtime");
class CourseApi extends runtime.BaseAPI {
    async deleteCourseRaw(requestParameters, initOverrides) {
        if (requestParameters.authorizationToken === null || requestParameters.authorizationToken === undefined) {
            throw new runtime.RequiredError('authorizationToken', 'Required parameter requestParameters.authorizationToken was null or undefined when calling deleteCourse.');
        }
        if (requestParameters.idCourseModel === null || requestParameters.idCourseModel === undefined) {
            throw new runtime.RequiredError('idCourseModel', 'Required parameter requestParameters.idCourseModel was null or undefined when calling deleteCourse.');
        }
        const queryParameters = {};
        const headerParameters = {};
        headerParameters['Content-Type'] = 'application/json';
        if (requestParameters.authorizationToken !== undefined && requestParameters.authorizationToken !== null) {
            headerParameters['Authorization_token'] = String(requestParameters.authorizationToken);
        }
        const response = await this.request({
            path: `/course`,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.idCourseModel,
        }, initOverrides);
        return new runtime.TextApiResponse(response);
    }
    async deleteCourse(requestParameters, initOverrides) {
        const response = await this.deleteCourseRaw(requestParameters, initOverrides);
        return await response.value();
    }
    async getCourseRaw(requestParameters, initOverrides) {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id', 'Required parameter requestParameters.id was null or undefined when calling getCourse.');
        }
        if (requestParameters.authorizationToken === null || requestParameters.authorizationToken === undefined) {
            throw new runtime.RequiredError('authorizationToken', 'Required parameter requestParameters.authorizationToken was null or undefined when calling getCourse.');
        }
        const queryParameters = {};
        const headerParameters = {};
        if (requestParameters.authorizationToken !== undefined && requestParameters.authorizationToken !== null) {
            headerParameters['Authorization_token'] = String(requestParameters.authorizationToken);
        }
        const response = await this.request({
            path: `/course/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);
        return new runtime.JSONApiResponse(response);
    }
    async getCourse(requestParameters, initOverrides) {
        const response = await this.getCourseRaw(requestParameters, initOverrides);
        return await response.value();
    }
    async getCourseSectionsRaw(requestParameters, initOverrides) {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id', 'Required parameter requestParameters.id was null or undefined when calling getCourseSections.');
        }
        if (requestParameters.authorizationToken === null || requestParameters.authorizationToken === undefined) {
            throw new runtime.RequiredError('authorizationToken', 'Required parameter requestParameters.authorizationToken was null or undefined when calling getCourseSections.');
        }
        const queryParameters = {};
        const headerParameters = {};
        if (requestParameters.authorizationToken !== undefined && requestParameters.authorizationToken !== null) {
            headerParameters['Authorization_token'] = String(requestParameters.authorizationToken);
        }
        const response = await this.request({
            path: `/course/sections/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);
        return new runtime.JSONApiResponse(response);
    }
    async getCourseSections(requestParameters, initOverrides) {
        const response = await this.getCourseSectionsRaw(requestParameters, initOverrides);
        return await response.value();
    }
    async postCourseRaw(requestParameters, initOverrides) {
        if (requestParameters.authorizationToken === null || requestParameters.authorizationToken === undefined) {
            throw new runtime.RequiredError('authorizationToken', 'Required parameter requestParameters.authorizationToken was null or undefined when calling postCourse.');
        }
        if (requestParameters.createCourseModel === null || requestParameters.createCourseModel === undefined) {
            throw new runtime.RequiredError('createCourseModel', 'Required parameter requestParameters.createCourseModel was null or undefined when calling postCourse.');
        }
        const queryParameters = {};
        const headerParameters = {};
        headerParameters['Content-Type'] = 'application/json';
        if (requestParameters.authorizationToken !== undefined && requestParameters.authorizationToken !== null) {
            headerParameters['Authorization_token'] = String(requestParameters.authorizationToken);
        }
        const response = await this.request({
            path: `/course`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.createCourseModel,
        }, initOverrides);
        return new runtime.TextApiResponse(response);
    }
    async postCourse(requestParameters, initOverrides) {
        const response = await this.postCourseRaw(requestParameters, initOverrides);
        return await response.value();
    }
    async updateCourseRaw(requestParameters, initOverrides) {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id', 'Required parameter requestParameters.id was null or undefined when calling updateCourse.');
        }
        if (requestParameters.authorizationToken === null || requestParameters.authorizationToken === undefined) {
            throw new runtime.RequiredError('authorizationToken', 'Required parameter requestParameters.authorizationToken was null or undefined when calling updateCourse.');
        }
        if (requestParameters.updateCourseModel === null || requestParameters.updateCourseModel === undefined) {
            throw new runtime.RequiredError('updateCourseModel', 'Required parameter requestParameters.updateCourseModel was null or undefined when calling updateCourse.');
        }
        const queryParameters = {};
        const headerParameters = {};
        headerParameters['Content-Type'] = 'application/json';
        if (requestParameters.authorizationToken !== undefined && requestParameters.authorizationToken !== null) {
            headerParameters['Authorization_token'] = String(requestParameters.authorizationToken);
        }
        const response = await this.request({
            path: `/course/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.updateCourseModel,
        }, initOverrides);
        return new runtime.TextApiResponse(response);
    }
    async updateCourse(requestParameters, initOverrides) {
        const response = await this.updateCourseRaw(requestParameters, initOverrides);
        return await response.value();
    }
}
exports.CourseApi = CourseApi;
//# sourceMappingURL=CourseApi.js.map