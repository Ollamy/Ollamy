/* tslint:disable */
/* eslint-disable */

import * as runtime from '../runtime';
import type {
  GetLastBuildUrlResponse,
} from '../models/index';

export interface RegisterSectionRequest {
    body: object;
}

/**
 */
export class MobileAppApi extends runtime.BaseAPI {

    /**
     */
    async getLastBuildUrlRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetLastBuildUrlResponse> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/mobileApp/last_build_url`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return response.json();
    }

    /**
     */
    static getLastBuildUrl(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetLastBuildUrlResponse> {
        return localMobileAppApi.getLastBuildUrlRaw(initOverrides);
    }

    /**
     */
    async registerSectionRaw(requestParameters: RegisterSectionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        if (requestParameters.body === null || requestParameters.body === undefined) {
            throw new runtime.RequiredError('body','Required parameter requestParameters.body was null or undefined when calling registerSection.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/mobileApp/webhook/new_build`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.body as any,
        }, initOverrides);

    }

    /**
     */
    static registerSection(requestParameters: RegisterSectionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        return localMobileAppApi.registerSectionRaw(requestParameters, initOverrides);
    }

}

const localMobileAppApi = new MobileAppApi();