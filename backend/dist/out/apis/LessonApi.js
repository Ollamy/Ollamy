"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonApi = void 0;
const runtime = require("../runtime");
class LessonApi extends runtime.BaseAPI {
    async deleteLessonRaw(requestParameters, initOverrides) {
        if (requestParameters.authorizationToken === null || requestParameters.authorizationToken === undefined) {
            throw new runtime.RequiredError('authorizationToken', 'Required parameter requestParameters.authorizationToken was null or undefined when calling deleteLesson.');
        }
        if (requestParameters.idLessonModel === null || requestParameters.idLessonModel === undefined) {
            throw new runtime.RequiredError('idLessonModel', 'Required parameter requestParameters.idLessonModel was null or undefined when calling deleteLesson.');
        }
        const queryParameters = {};
        const headerParameters = {};
        headerParameters['Content-Type'] = 'application/json';
        if (requestParameters.authorizationToken !== undefined && requestParameters.authorizationToken !== null) {
            headerParameters['Authorization_token'] = String(requestParameters.authorizationToken);
        }
        const response = await this.request({
            path: `/lesson`,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.idLessonModel,
        }, initOverrides);
        return new runtime.TextApiResponse(response);
    }
    async deleteLesson(requestParameters, initOverrides) {
        const response = await this.deleteLessonRaw(requestParameters, initOverrides);
        return await response.value();
    }
    async getLessonRaw(requestParameters, initOverrides) {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id', 'Required parameter requestParameters.id was null or undefined when calling getLesson.');
        }
        if (requestParameters.authorizationToken === null || requestParameters.authorizationToken === undefined) {
            throw new runtime.RequiredError('authorizationToken', 'Required parameter requestParameters.authorizationToken was null or undefined when calling getLesson.');
        }
        const queryParameters = {};
        const headerParameters = {};
        if (requestParameters.authorizationToken !== undefined && requestParameters.authorizationToken !== null) {
            headerParameters['Authorization_token'] = String(requestParameters.authorizationToken);
        }
        const response = await this.request({
            path: `/lesson/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);
        return new runtime.JSONApiResponse(response);
    }
    async getLesson(requestParameters, initOverrides) {
        const response = await this.getLessonRaw(requestParameters, initOverrides);
        return await response.value();
    }
    async getLessonQuestionsRaw(requestParameters, initOverrides) {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id', 'Required parameter requestParameters.id was null or undefined when calling getLessonQuestions.');
        }
        if (requestParameters.authorizationToken === null || requestParameters.authorizationToken === undefined) {
            throw new runtime.RequiredError('authorizationToken', 'Required parameter requestParameters.authorizationToken was null or undefined when calling getLessonQuestions.');
        }
        const queryParameters = {};
        const headerParameters = {};
        if (requestParameters.authorizationToken !== undefined && requestParameters.authorizationToken !== null) {
            headerParameters['Authorization_token'] = String(requestParameters.authorizationToken);
        }
        const response = await this.request({
            path: `/lesson/questions/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);
        return new runtime.JSONApiResponse(response);
    }
    async getLessonQuestions(requestParameters, initOverrides) {
        const response = await this.getLessonQuestionsRaw(requestParameters, initOverrides);
        return await response.value();
    }
    async registerLessonRaw(requestParameters, initOverrides) {
        if (requestParameters.authorizationToken === null || requestParameters.authorizationToken === undefined) {
            throw new runtime.RequiredError('authorizationToken', 'Required parameter requestParameters.authorizationToken was null or undefined when calling registerLesson.');
        }
        if (requestParameters.createLessonModel === null || requestParameters.createLessonModel === undefined) {
            throw new runtime.RequiredError('createLessonModel', 'Required parameter requestParameters.createLessonModel was null or undefined when calling registerLesson.');
        }
        const queryParameters = {};
        const headerParameters = {};
        headerParameters['Content-Type'] = 'application/json';
        if (requestParameters.authorizationToken !== undefined && requestParameters.authorizationToken !== null) {
            headerParameters['Authorization_token'] = String(requestParameters.authorizationToken);
        }
        const response = await this.request({
            path: `/lesson`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.createLessonModel,
        }, initOverrides);
        return new runtime.TextApiResponse(response);
    }
    async registerLesson(requestParameters, initOverrides) {
        const response = await this.registerLessonRaw(requestParameters, initOverrides);
        return await response.value();
    }
    async updateLessonRaw(requestParameters, initOverrides) {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id', 'Required parameter requestParameters.id was null or undefined when calling updateLesson.');
        }
        if (requestParameters.authorizationToken === null || requestParameters.authorizationToken === undefined) {
            throw new runtime.RequiredError('authorizationToken', 'Required parameter requestParameters.authorizationToken was null or undefined when calling updateLesson.');
        }
        if (requestParameters.lessonModel === null || requestParameters.lessonModel === undefined) {
            throw new runtime.RequiredError('lessonModel', 'Required parameter requestParameters.lessonModel was null or undefined when calling updateLesson.');
        }
        const queryParameters = {};
        const headerParameters = {};
        headerParameters['Content-Type'] = 'application/json';
        if (requestParameters.authorizationToken !== undefined && requestParameters.authorizationToken !== null) {
            headerParameters['Authorization_token'] = String(requestParameters.authorizationToken);
        }
        const response = await this.request({
            path: `/lesson/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.lessonModel,
        }, initOverrides);
        return new runtime.TextApiResponse(response);
    }
    async updateLesson(requestParameters, initOverrides) {
        const response = await this.updateLessonRaw(requestParameters, initOverrides);
        return await response.value();
    }
}
exports.LessonApi = LessonApi;
//# sourceMappingURL=LessonApi.js.map