/* tslint:disable */
/* eslint-disable */

import * as runtime from '../runtime';
import type {
  CreateUserModel,
  GetUserModel,
  GetUserScoreModel,
  LoginUserModel,
  SuccessBody,
  UpdateUserModel,
  UserCoursesResponse,
  UserIdResponse,
  UserTrueResponse,
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
    async deleteUserRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserIdResponse> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/user`,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return response.json();
    }

    /**
     */
    static deleteUser(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserIdResponse> {
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
    async getUserCoursesRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserCoursesResponse> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/user/courses`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return response.json();
    }

    /**
     */
    static getUserCourses(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserCoursesResponse> {
        return localUserApi.getUserCoursesRaw(initOverrides);
    }

    /**
     */
    async getUserScoreRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetUserScoreModel> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/user/score`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return response.json();
    }

    /**
     */
    static getUserScore(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetUserScoreModel> {
        return localUserApi.getUserScoreRaw(initOverrides);
    }

    /**
     */
    async loginUserRaw(requestParameters: LoginUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserTrueResponse> {
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

        return response.json();
    }

    /**
     */
    static loginUser(requestParameters: LoginUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserTrueResponse> {
        return localUserApi.loginUserRaw(requestParameters, initOverrides);
    }

    /**
     */
    async logoutUserRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SuccessBody> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/user/logout`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return response.json();
    }

    /**
     */
    static logoutUser(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SuccessBody> {
        return localUserApi.logoutUserRaw(initOverrides);
    }

    /**
     */
    async registerUserRaw(requestParameters: RegisterUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserTrueResponse> {
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

        return response.json();
    }

    /**
     */
    static registerUser(requestParameters: RegisterUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserTrueResponse> {
        return localUserApi.registerUserRaw(requestParameters, initOverrides);
    }

    /**
     */
    async updateUserRaw(requestParameters: UpdateUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SuccessBody> {
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

        return response.json();
    }

    /**
     */
    static updateUser(requestParameters: UpdateUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SuccessBody> {
        return localUserApi.updateUserRaw(requestParameters, initOverrides);
    }

}

const localUserApi = new UserApi();
