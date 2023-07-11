"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionApi = void 0;
const runtime = require("../runtime");
class QuestionApi extends runtime.BaseAPI {
    async deleteQuestionRaw(requestParameters, initOverrides) {
        if (requestParameters.authorizationToken === null || requestParameters.authorizationToken === undefined) {
            throw new runtime.RequiredError('authorizationToken', 'Required parameter requestParameters.authorizationToken was null or undefined when calling deleteQuestion.');
        }
        if (requestParameters.idQuestionModel === null || requestParameters.idQuestionModel === undefined) {
            throw new runtime.RequiredError('idQuestionModel', 'Required parameter requestParameters.idQuestionModel was null or undefined when calling deleteQuestion.');
        }
        const queryParameters = {};
        const headerParameters = {};
        headerParameters['Content-Type'] = 'application/json';
        if (requestParameters.authorizationToken !== undefined && requestParameters.authorizationToken !== null) {
            headerParameters['Authorization_token'] = String(requestParameters.authorizationToken);
        }
        const response = await this.request({
            path: `/question`,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.idQuestionModel,
        }, initOverrides);
        return new runtime.TextApiResponse(response);
    }
    async deleteQuestion(requestParameters, initOverrides) {
        const response = await this.deleteQuestionRaw(requestParameters, initOverrides);
        return await response.value();
    }
    async getQuestionRaw(requestParameters, initOverrides) {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id', 'Required parameter requestParameters.id was null or undefined when calling getQuestion.');
        }
        if (requestParameters.authorizationToken === null || requestParameters.authorizationToken === undefined) {
            throw new runtime.RequiredError('authorizationToken', 'Required parameter requestParameters.authorizationToken was null or undefined when calling getQuestion.');
        }
        const queryParameters = {};
        const headerParameters = {};
        if (requestParameters.authorizationToken !== undefined && requestParameters.authorizationToken !== null) {
            headerParameters['Authorization_token'] = String(requestParameters.authorizationToken);
        }
        const response = await this.request({
            path: `/question/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);
        return new runtime.JSONApiResponse(response);
    }
    async getQuestion(requestParameters, initOverrides) {
        const response = await this.getQuestionRaw(requestParameters, initOverrides);
        return await response.value();
    }
    async registerQuestionRaw(requestParameters, initOverrides) {
        if (requestParameters.authorizationToken === null || requestParameters.authorizationToken === undefined) {
            throw new runtime.RequiredError('authorizationToken', 'Required parameter requestParameters.authorizationToken was null or undefined when calling registerQuestion.');
        }
        if (requestParameters.createQuestionModel === null || requestParameters.createQuestionModel === undefined) {
            throw new runtime.RequiredError('createQuestionModel', 'Required parameter requestParameters.createQuestionModel was null or undefined when calling registerQuestion.');
        }
        const queryParameters = {};
        const headerParameters = {};
        headerParameters['Content-Type'] = 'application/json';
        if (requestParameters.authorizationToken !== undefined && requestParameters.authorizationToken !== null) {
            headerParameters['Authorization_token'] = String(requestParameters.authorizationToken);
        }
        const response = await this.request({
            path: `/question`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.createQuestionModel,
        }, initOverrides);
        return new runtime.TextApiResponse(response);
    }
    async registerQuestion(requestParameters, initOverrides) {
        const response = await this.registerQuestionRaw(requestParameters, initOverrides);
        return await response.value();
    }
    async updateQuestionRaw(requestParameters, initOverrides) {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id', 'Required parameter requestParameters.id was null or undefined when calling updateQuestion.');
        }
        if (requestParameters.authorizationToken === null || requestParameters.authorizationToken === undefined) {
            throw new runtime.RequiredError('authorizationToken', 'Required parameter requestParameters.authorizationToken was null or undefined when calling updateQuestion.');
        }
        if (requestParameters.updateQuestionModel === null || requestParameters.updateQuestionModel === undefined) {
            throw new runtime.RequiredError('updateQuestionModel', 'Required parameter requestParameters.updateQuestionModel was null or undefined when calling updateQuestion.');
        }
        const queryParameters = {};
        const headerParameters = {};
        headerParameters['Content-Type'] = 'application/json';
        if (requestParameters.authorizationToken !== undefined && requestParameters.authorizationToken !== null) {
            headerParameters['Authorization_token'] = String(requestParameters.authorizationToken);
        }
        const response = await this.request({
            path: `/question/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.updateQuestionModel,
        }, initOverrides);
        return new runtime.TextApiResponse(response);
    }
    async updateQuestion(requestParameters, initOverrides) {
        const response = await this.updateQuestionRaw(requestParameters, initOverrides);
        return await response.value();
    }
}
exports.QuestionApi = QuestionApi;
//# sourceMappingURL=QuestionApi.js.map