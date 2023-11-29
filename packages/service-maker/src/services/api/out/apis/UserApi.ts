/* tslint:disable */
/* eslint-disable */

import * as runtime from '../runtime';
import type {
  CreateUserModel,
  GetUserModel,
  LoginUserModel,
  UpdateUserModel,
} from '../models/index';

export interface LoginUserRequest {
    loginUserModel: LoginUserModel;
}

export interface RegisterUserRequest {
    createUserModel: CreateUserModel;
}

export interface UpdateUserRequest {
    updateUserModel: UpdateUserModel;
}

/**
 */
export class UserApi extends runtime.BaseAPI {

    /**
     */
    async deleteUserRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/user`,
            method: 'DELETE',
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
    static deleteUser(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        return localUserApi.deleteUserRaw(initOverrides);
    }

    /**
     */
    async getUserRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetUserModel> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/user`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return response.json();
    }

    /**
     */
    static getUser(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetUserModel> {
        return localUserApi.getUserRaw(initOverrides);
    }

    /**
     */
    async getUserCoursesRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/user/courses`,
            method: 'GET',
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
    static getUserCourses(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        return localUserApi.getUserCoursesRaw(initOverrides);
    }

    /**
     */
    async loginUserRaw(requestParameters: LoginUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
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

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return response.json();
        } else {
            return response.text();
        }
    }

    /**
     */
    static loginUser(requestParameters: LoginUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        return localUserApi.loginUserRaw(requestParameters, initOverrides);
    }

    /**
     */
    async registerUserRaw(requestParameters: RegisterUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
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

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return response.json();
        } else {
            return response.text();
        }
    }

    /**
     */
    static registerUser(requestParameters: RegisterUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        return localUserApi.registerUserRaw(requestParameters, initOverrides);
    }

    /**
     */
    async updateUserRaw(requestParameters: UpdateUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        if (requestParameters.updateUserModel === null || requestParameters.updateUserModel === undefined) {
            throw new runtime.RequiredError('updateUserModel','Required parameter requestParameters.updateUserModel was null or undefined when calling updateUser.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/user`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.updateUserModel,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return response.json();
        } else {
            return response.text();
        }
    }

    /**
     */
    static updateUser(requestParameters: UpdateUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        return localUserApi.updateUserRaw(requestParameters, initOverrides);
    }

}

const localUserApi = new UserApi();
