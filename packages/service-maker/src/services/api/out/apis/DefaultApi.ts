/* tslint:disable */
/* eslint-disable */

import * as runtime from '../runtime';

/**
 */
export class DefaultApi extends runtime.BaseAPI {

    /**
     */
    async healthCheckRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/health`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

    }

    /**
     */
    static healthCheck(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        return localDefaultApi.healthCheckRaw(initOverrides);
    }

}

const localDefaultApi = new DefaultApi();
