import * as runtime from '../runtime';
import type { ChapterModel, CreateChapterModel, IdChapterModel, LessonModel, UpdateChapterModel } from '../models';
export interface DeleteChapterRequest {
    authorizationToken: string;
    idChapterModel: IdChapterModel;
}
export interface GetChapterRequest {
    id: string;
    authorizationToken: string;
}
export interface GetChapterLessonsRequest {
    id: string;
    authorizationToken: string;
}
export interface RegisterChapterRequest {
    authorizationToken: string;
    createChapterModel: CreateChapterModel;
}
export interface UpdateChapterRequest {
    id: string;
    authorizationToken: string;
    updateChapterModel: UpdateChapterModel;
}
export declare class ChapterApi extends runtime.BaseAPI {
    deleteChapterRaw(requestParameters: DeleteChapterRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>>;
    deleteChapter(requestParameters: DeleteChapterRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string>;
    getChapterRaw(requestParameters: GetChapterRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ChapterModel>>;
    getChapter(requestParameters: GetChapterRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ChapterModel>;
    getChapterLessonsRaw(requestParameters: GetChapterLessonsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<LessonModel>>>;
    getChapterLessons(requestParameters: GetChapterLessonsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<LessonModel>>;
    registerChapterRaw(requestParameters: RegisterChapterRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>>;
    registerChapter(requestParameters: RegisterChapterRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string>;
    updateChapterRaw(requestParameters: UpdateChapterRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>>;
    updateChapter(requestParameters: UpdateChapterRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string>;
}
