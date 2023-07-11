import * as runtime from '../runtime';
import type { CreateLessonModel, IdLessonModel, LessonModel, QuestionModel } from '../models';
export interface DeleteLessonRequest {
    authorizationToken: string;
    idLessonModel: IdLessonModel;
}
export interface GetLessonRequest {
    id: string;
    authorizationToken: string;
}
export interface GetLessonQuestionsRequest {
    id: string;
    authorizationToken: string;
}
export interface RegisterLessonRequest {
    authorizationToken: string;
    createLessonModel: CreateLessonModel;
}
export interface UpdateLessonRequest {
    id: string;
    authorizationToken: string;
    lessonModel: LessonModel;
}
export declare class LessonApi extends runtime.BaseAPI {
    deleteLessonRaw(requestParameters: DeleteLessonRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>>;
    deleteLesson(requestParameters: DeleteLessonRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string>;
    getLessonRaw(requestParameters: GetLessonRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<LessonModel>>;
    getLesson(requestParameters: GetLessonRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<LessonModel>;
    getLessonQuestionsRaw(requestParameters: GetLessonQuestionsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<QuestionModel>>>;
    getLessonQuestions(requestParameters: GetLessonQuestionsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<QuestionModel>>;
    registerLessonRaw(requestParameters: RegisterLessonRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>>;
    registerLesson(requestParameters: RegisterLessonRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string>;
    updateLessonRaw(requestParameters: UpdateLessonRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>>;
    updateLesson(requestParameters: UpdateLessonRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string>;
}
