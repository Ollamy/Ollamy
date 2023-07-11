import * as runtime from '../runtime';
import type { CourseModel, CreateCourseModel, IdCourseModel, SectionModel, UpdateCourseModel } from '../models';
export interface DeleteCourseRequest {
    authorizationToken: string;
    idCourseModel: IdCourseModel;
}
export interface GetCourseRequest {
    id: string;
    authorizationToken: string;
}
export interface GetCourseSectionsRequest {
    id: string;
    authorizationToken: string;
}
export interface PostCourseRequest {
    authorizationToken: string;
    createCourseModel: CreateCourseModel;
}
export interface UpdateCourseRequest {
    id: string;
    authorizationToken: string;
    updateCourseModel: UpdateCourseModel;
}
export declare class CourseApi extends runtime.BaseAPI {
    deleteCourseRaw(requestParameters: DeleteCourseRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>>;
    deleteCourse(requestParameters: DeleteCourseRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string>;
    getCourseRaw(requestParameters: GetCourseRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CourseModel>>;
    getCourse(requestParameters: GetCourseRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CourseModel>;
    getCourseSectionsRaw(requestParameters: GetCourseSectionsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<SectionModel>>>;
    getCourseSections(requestParameters: GetCourseSectionsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<SectionModel>>;
    postCourseRaw(requestParameters: PostCourseRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>>;
    postCourse(requestParameters: PostCourseRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string>;
    updateCourseRaw(requestParameters: UpdateCourseRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>>;
    updateCourse(requestParameters: UpdateCourseRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string>;
}
