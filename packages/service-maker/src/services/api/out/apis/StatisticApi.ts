/* tslint:disable */
/* eslint-disable */

import * as runtime from '../runtime';
import type {
  CourseUserStatistic,
  GradeStatisticModel,
} from '../models/index';

export interface GradeRequest {
    type: GradeTypeEnum;
    operation: GradeOperationEnum;
    courseId: string;
}

export interface UserRequest {
    courseId: string;
}

/**
 */
export class StatisticApi extends runtime.BaseAPI {

    /**
     */
    async gradeRaw(requestParameters: GradeRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<GradeStatisticModel>> {
        if (requestParameters.type === null || requestParameters.type === undefined) {
            throw new runtime.RequiredError('type','Required parameter requestParameters.type was null or undefined when calling grade.');
        }

        if (requestParameters.operation === null || requestParameters.operation === undefined) {
            throw new runtime.RequiredError('operation','Required parameter requestParameters.operation was null or undefined when calling grade.');
        }

        if (requestParameters.courseId === null || requestParameters.courseId === undefined) {
            throw new runtime.RequiredError('courseId','Required parameter requestParameters.courseId was null or undefined when calling grade.');
        }

        const queryParameters: any = {};

        if (requestParameters.courseId !== undefined) {
            queryParameters['courseId'] = requestParameters.courseId;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/statistic/{type}/{operation}`.replace(`{${"type"}}`, encodeURIComponent(String(requestParameters.type))).replace(`{${"operation"}}`, encodeURIComponent(String(requestParameters.operation))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return response.json();
    }

    /**
     */
    static grade(requestParameters: GradeRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<GradeStatisticModel>> {
        return localStatisticApi.gradeRaw(requestParameters, initOverrides);
    }

    /**
     */
    async userRaw(requestParameters: UserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<CourseUserStatistic>> {
        if (requestParameters.courseId === null || requestParameters.courseId === undefined) {
            throw new runtime.RequiredError('courseId','Required parameter requestParameters.courseId was null or undefined when calling user.');
        }

        const queryParameters: any = {};

        if (requestParameters.courseId !== undefined) {
            queryParameters['courseId'] = requestParameters.courseId;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/statistic/user`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return response.json();
    }

    /**
     */
    static user(requestParameters: UserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<CourseUserStatistic>> {
        return localStatisticApi.userRaw(requestParameters, initOverrides);
    }

}

const localStatisticApi = new StatisticApi();

/**
 * @export
 */
export const GradeTypeEnum = {
    Student: 'STUDENT',
    Course: 'COURSE',
    Section: 'SECTION',
    Lesson: 'LESSON'
} as const;
export type GradeTypeEnum = typeof GradeTypeEnum[keyof typeof GradeTypeEnum];
/**
 * @export
 */
export const GradeOperationEnum = {
    Average: 'AVERAGE',
    Max: 'MAX',
    Min: 'MIN',
    All: 'ALL'
} as const;
export type GradeOperationEnum = typeof GradeOperationEnum[keyof typeof GradeOperationEnum];
