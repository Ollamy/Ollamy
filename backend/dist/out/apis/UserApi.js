"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserApi = void 0;
const runtime = require("../runtime");
class UserApi extends runtime.BaseAPI {
    async deleteUserRaw(requestParameters, initOverrides) {
        if (requestParameters.authorizationToken === null || requestParameters.authorizationToken === undefined) {
            throw new runtime.RequiredError('authorizationToken', 'Required parameter requestParameters.authorizationToken was null or undefined when calling deleteUser.');
        }
        const queryParameters = {};
        const headerParameters = {};
        if (requestParameters.authorizationToken !== undefined && requestParameters.authorizationToken !== null) {
            headerParameters['Authorization_token'] = String(requestParameters.authorizationToken);
        }
        const response = await this.request({
            path: `/user`,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);
        return new runtime.TextApiResponse(response);
    }
    async deleteUser(requestParameters, initOverrides) {
        const response = await this.deleteUserRaw(requestParameters, initOverrides);
        return await response.value();
    }
    async loginUserRaw(requestParameters, initOverrides) {
        if (requestParameters.loginUserModel === null || requestParameters.loginUserModel === undefined) {
            throw new runtime.RequiredError('loginUserModel', 'Required parameter requestParameters.loginUserModel was null or undefined when calling loginUser.');
        }
        const queryParameters = {};
        const headerParameters = {};
        headerParameters['Content-Type'] = 'application/json';
        const response = await this.request({
            path: `/user/login`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.loginUserModel,
        }, initOverrides);
        return new runtime.TextApiResponse(response);
    }
    async loginUser(requestParameters, initOverrides) {
        const response = await this.loginUserRaw(requestParameters, initOverrides);
        return await response.value();
    }
    async registerUserRaw(requestParameters, initOverrides) {
        if (requestParameters.createUserModel === null || requestParameters.createUserModel === undefined) {
            throw new runtime.RequiredError('createUserModel', 'Required parameter requestParameters.createUserModel was null or undefined when calling registerUser.');
        }
        const queryParameters = {};
        const headerParameters = {};
        headerParameters['Content-Type'] = 'application/json';
        const response = await this.request({
            path: `/user/register`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.createUserModel,
        }, initOverrides);
        return new runtime.TextApiResponse(response);
    }
    async registerUser(requestParameters, initOverrides) {
        const response = await this.registerUserRaw(requestParameters, initOverrides);
        return await response.value();
    }
    async updateUserRaw(requestParameters, initOverrides) {
        if (requestParameters.authorizationToken === null || requestParameters.authorizationToken === undefined) {
            throw new runtime.RequiredError('authorizationToken', 'Required parameter requestParameters.authorizationToken was null or undefined when calling updateUser.');
        }
        if (requestParameters.updateUserModel === null || requestParameters.updateUserModel === undefined) {
            throw new runtime.RequiredError('updateUserModel', 'Required parameter requestParameters.updateUserModel was null or undefined when calling updateUser.');
        }
        const queryParameters = {};
        const headerParameters = {};
        headerParameters['Content-Type'] = 'application/json';
        if (requestParameters.authorizationToken !== undefined && requestParameters.authorizationToken !== null) {
            headerParameters['Authorization_token'] = String(requestParameters.authorizationToken);
        }
        const response = await this.request({
            path: `/user`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.updateUserModel,
        }, initOverrides);
        return new runtime.TextApiResponse(response);
    }
    async updateUser(requestParameters, initOverrides) {
        const response = await this.updateUserRaw(requestParameters, initOverrides);
        return await response.value();
    }
}
exports.UserApi = UserApi;
//# sourceMappingURL=UserApi.js.map