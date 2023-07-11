"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChapterApi = void 0;
const runtime = require("../runtime");
class ChapterApi extends runtime.BaseAPI {
    async deleteChapterRaw(requestParameters, initOverrides) {
        if (requestParameters.authorizationToken === null || requestParameters.authorizationToken === undefined) {
            throw new runtime.RequiredError('authorizationToken', 'Required parameter requestParameters.authorizationToken was null or undefined when calling deleteChapter.');
        }
        if (requestParameters.idChapterModel === null || requestParameters.idChapterModel === undefined) {
            throw new runtime.RequiredError('idChapterModel', 'Required parameter requestParameters.idChapterModel was null or undefined when calling deleteChapter.');
        }
        const queryParameters = {};
        const headerParameters = {};
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
        return new runtime.TextApiResponse(response);
    }
    async deleteChapter(requestParameters, initOverrides) {
        const response = await this.deleteChapterRaw(requestParameters, initOverrides);
        return await response.value();
    }
    async getChapterRaw(requestParameters, initOverrides) {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id', 'Required parameter requestParameters.id was null or undefined when calling getChapter.');
        }
        if (requestParameters.authorizationToken === null || requestParameters.authorizationToken === undefined) {
            throw new runtime.RequiredError('authorizationToken', 'Required parameter requestParameters.authorizationToken was null or undefined when calling getChapter.');
        }
        const queryParameters = {};
        const headerParameters = {};
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
    async getChapter(requestParameters, initOverrides) {
        const response = await this.getChapterRaw(requestParameters, initOverrides);
        return await response.value();
    }
    async getChapterLessonsRaw(requestParameters, initOverrides) {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id', 'Required parameter requestParameters.id was null or undefined when calling getChapterLessons.');
        }
        if (requestParameters.authorizationToken === null || requestParameters.authorizationToken === undefined) {
            throw new runtime.RequiredError('authorizationToken', 'Required parameter requestParameters.authorizationToken was null or undefined when calling getChapterLessons.');
        }
        const queryParameters = {};
        const headerParameters = {};
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
    async getChapterLessons(requestParameters, initOverrides) {
        const response = await this.getChapterLessonsRaw(requestParameters, initOverrides);
        return await response.value();
    }
    async registerChapterRaw(requestParameters, initOverrides) {
        if (requestParameters.authorizationToken === null || requestParameters.authorizationToken === undefined) {
            throw new runtime.RequiredError('authorizationToken', 'Required parameter requestParameters.authorizationToken was null or undefined when calling registerChapter.');
        }
        if (requestParameters.createChapterModel === null || requestParameters.createChapterModel === undefined) {
            throw new runtime.RequiredError('createChapterModel', 'Required parameter requestParameters.createChapterModel was null or undefined when calling registerChapter.');
        }
        const queryParameters = {};
        const headerParameters = {};
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
        return new runtime.TextApiResponse(response);
    }
    async registerChapter(requestParameters, initOverrides) {
        const response = await this.registerChapterRaw(requestParameters, initOverrides);
        return await response.value();
    }
    async updateChapterRaw(requestParameters, initOverrides) {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id', 'Required parameter requestParameters.id was null or undefined when calling updateChapter.');
        }
        if (requestParameters.authorizationToken === null || requestParameters.authorizationToken === undefined) {
            throw new runtime.RequiredError('authorizationToken', 'Required parameter requestParameters.authorizationToken was null or undefined when calling updateChapter.');
        }
        if (requestParameters.updateChapterModel === null || requestParameters.updateChapterModel === undefined) {
            throw new runtime.RequiredError('updateChapterModel', 'Required parameter requestParameters.updateChapterModel was null or undefined when calling updateChapter.');
        }
        const queryParameters = {};
        const headerParameters = {};
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
        return new runtime.TextApiResponse(response);
    }
    async updateChapter(requestParameters, initOverrides) {
        const response = await this.updateChapterRaw(requestParameters, initOverrides);
        return await response.value();
    }
}
exports.ChapterApi = ChapterApi;
//# sourceMappingURL=ChapterApi.js.map