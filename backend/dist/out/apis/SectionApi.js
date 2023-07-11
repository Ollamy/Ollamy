"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionApi = void 0;
const runtime = require("../runtime");
class SectionApi extends runtime.BaseAPI {
    async deleteSectionRaw(requestParameters, initOverrides) {
        if (requestParameters.authorizationToken === null || requestParameters.authorizationToken === undefined) {
            throw new runtime.RequiredError('authorizationToken', 'Required parameter requestParameters.authorizationToken was null or undefined when calling deleteSection.');
        }
        if (requestParameters.idSectionModel === null || requestParameters.idSectionModel === undefined) {
            throw new runtime.RequiredError('idSectionModel', 'Required parameter requestParameters.idSectionModel was null or undefined when calling deleteSection.');
        }
        const queryParameters = {};
        const headerParameters = {};
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
        return new runtime.TextApiResponse(response);
    }
    async deleteSection(requestParameters, initOverrides) {
        const response = await this.deleteSectionRaw(requestParameters, initOverrides);
        return await response.value();
    }
    async getSectionRaw(requestParameters, initOverrides) {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id', 'Required parameter requestParameters.id was null or undefined when calling getSection.');
        }
        if (requestParameters.authorizationToken === null || requestParameters.authorizationToken === undefined) {
            throw new runtime.RequiredError('authorizationToken', 'Required parameter requestParameters.authorizationToken was null or undefined when calling getSection.');
        }
        const queryParameters = {};
        const headerParameters = {};
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
    async getSection(requestParameters, initOverrides) {
        const response = await this.getSectionRaw(requestParameters, initOverrides);
        return await response.value();
    }
    async getSectionChaptersRaw(requestParameters, initOverrides) {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id', 'Required parameter requestParameters.id was null or undefined when calling getSectionChapters.');
        }
        if (requestParameters.authorizationToken === null || requestParameters.authorizationToken === undefined) {
            throw new runtime.RequiredError('authorizationToken', 'Required parameter requestParameters.authorizationToken was null or undefined when calling getSectionChapters.');
        }
        const queryParameters = {};
        const headerParameters = {};
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
    async getSectionChapters(requestParameters, initOverrides) {
        const response = await this.getSectionChaptersRaw(requestParameters, initOverrides);
        return await response.value();
    }
    async registerSectionRaw(requestParameters, initOverrides) {
        if (requestParameters.authorizationToken === null || requestParameters.authorizationToken === undefined) {
            throw new runtime.RequiredError('authorizationToken', 'Required parameter requestParameters.authorizationToken was null or undefined when calling registerSection.');
        }
        if (requestParameters.createSectionModel === null || requestParameters.createSectionModel === undefined) {
            throw new runtime.RequiredError('createSectionModel', 'Required parameter requestParameters.createSectionModel was null or undefined when calling registerSection.');
        }
        const queryParameters = {};
        const headerParameters = {};
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
        return new runtime.TextApiResponse(response);
    }
    async registerSection(requestParameters, initOverrides) {
        const response = await this.registerSectionRaw(requestParameters, initOverrides);
        return await response.value();
    }
    async updateSectionRaw(requestParameters, initOverrides) {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id', 'Required parameter requestParameters.id was null or undefined when calling updateSection.');
        }
        if (requestParameters.authorizationToken === null || requestParameters.authorizationToken === undefined) {
            throw new runtime.RequiredError('authorizationToken', 'Required parameter requestParameters.authorizationToken was null or undefined when calling updateSection.');
        }
        if (requestParameters.updateSectionModel === null || requestParameters.updateSectionModel === undefined) {
            throw new runtime.RequiredError('updateSectionModel', 'Required parameter requestParameters.updateSectionModel was null or undefined when calling updateSection.');
        }
        const queryParameters = {};
        const headerParameters = {};
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
        return new runtime.TextApiResponse(response);
    }
    async updateSection(requestParameters, initOverrides) {
        const response = await this.updateSectionRaw(requestParameters, initOverrides);
        return await response.value();
    }
}
exports.SectionApi = SectionApi;
//# sourceMappingURL=SectionApi.js.map