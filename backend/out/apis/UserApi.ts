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
  CreateUserModel,
  LoginUserModel,
  UpdateUserModel,
} from '../models';

export interface DeleteUserRequest {
    authorizationToken: string;
}

export interface LoginUserRequest {
    loginUserModel: LoginUserModel;
}

export interface RegisterUserRequest {
    createUserModel: CreateUserModel;
}

export interface UpdateUserRequest {
    authorizationToken: string;
    updateUserModel: UpdateUserModel;
}

/**
 * 
 */
export class UserApi extends runtime.BaseAPI {

    /**
     */
    async deleteUserRaw(requestParameters: DeleteUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        if (requestParameters.authorizationToken === null || requestParameters.authorizationToken === undefined) {
            throw new runtime.RequiredError('authorizationToken','Required parameter requestParameters.authorizationToken was null or undefined when calling deleteUser.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters.authorizationToken !== undefined && requestParameters.authorizationToken !== null) {
            headerParameters['Authorization_token'] = String(requestParameters.authorizationToken);
        }

        const response = await this.request({
            path: `/user`,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.TextApiResponse(response) as any;
    }

    /**
     */
    async deleteUser(requestParameters: DeleteUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.deleteUserRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async loginUserRaw(requestParameters: LoginUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        if (requestParameters.loginUserModel === null || requestParameters.loginUserModel === undefined) {
            throw new runtime.RequiredError('loginUserModel','Required parameter requestParameters.loginUserModel was null or undefined when calling loginUser.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/user/login`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.loginUserModel,
        }, initOverrides);

        return new runtime.TextApiResponse(response) as any;
    }

    /**
     */
    async loginUser(requestParameters: LoginUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.loginUserRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async registerUserRaw(requestParameters: RegisterUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        if (requestParameters.createUserModel === null || requestParameters.createUserModel === undefined) {
            throw new runtime.RequiredError('createUserModel','Required parameter requestParameters.createUserModel was null or undefined when calling registerUser.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/user/register`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.createUserModel,
        }, initOverrides);

        return new runtime.TextApiResponse(response) as any;
    }

    /**
     */
    async registerUser(requestParameters: RegisterUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.registerUserRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async updateUserRaw(requestParameters: UpdateUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        if (requestParameters.authorizationToken === null || requestParameters.authorizationToken === undefined) {
            throw new runtime.RequiredError('authorizationToken','Required parameter requestParameters.authorizationToken was null or undefined when calling updateUser.');
        }

        if (requestParameters.updateUserModel === null || requestParameters.updateUserModel === undefined) {
            throw new runtime.RequiredError('updateUserModel','Required parameter requestParameters.updateUserModel was null or undefined when calling updateUser.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

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

        return new runtime.TextApiResponse(response) as any;
    }

    /**
     */
    async updateUser(requestParameters: UpdateUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.updateUserRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
