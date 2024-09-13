/* tslint:disable */
/* eslint-disable */

import * as runtime from '../runtime';
import type {
  EventTriggered,
} from '../models/index';

/**
 */
export class EventApi extends runtime.BaseAPI {

    /**
     */
    async logEventandTriggerBadgeRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<EventTriggered> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/event`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return response.json();
    }

    /**
     */
    static logEventandTriggerBadge(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<EventTriggered> {
        return localEventApi.logEventandTriggerBadgeRaw(initOverrides);
    }

}

const localEventApi = new EventApi();
