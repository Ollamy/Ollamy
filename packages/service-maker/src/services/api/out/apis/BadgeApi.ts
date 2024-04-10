/* tslint:disable */
/* eslint-disable */

import * as runtime from '../runtime';
import type {
  GetUsersBadges,
} from '../models/index';

/**
 */
export class BadgeApi extends runtime.BaseAPI {

    /**
     */
    async getBadgeRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetUsersBadges> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/badge/unlocked`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return response.json();
    }

    /**
     */
    static getBadge(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetUsersBadges> {
        return localBadgeApi.getBadgeRaw(initOverrides);
    }

}

const localBadgeApi = new BadgeApi();
