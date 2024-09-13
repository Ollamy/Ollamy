/* tslint:disable */
/* eslint-disable */

import * as runtime from '../runtime';
import type {
  EventTriggered,
  LogEventData,
} from '../models/index';

export interface LogEventandTriggerBadgeRequest {
    logEventData: LogEventData;
}

/**
 */
export class EventApi extends runtime.BaseAPI {

    /**
     */
    async logEventandTriggerBadgeRaw(requestParameters: LogEventandTriggerBadgeRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<EventTriggered> {
        if (requestParameters.logEventData === null || requestParameters.logEventData === undefined) {
            throw new runtime.RequiredError('logEventData','Required parameter requestParameters.logEventData was null or undefined when calling logEventandTriggerBadge.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/event`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.logEventData,
        }, initOverrides);

        return response.json();
    }

    /**
     */
    static logEventandTriggerBadge(requestParameters: LogEventandTriggerBadgeRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<EventTriggered> {
        return localEventApi.logEventandTriggerBadgeRaw(requestParameters, initOverrides);
    }

}

const localEventApi = new EventApi();
