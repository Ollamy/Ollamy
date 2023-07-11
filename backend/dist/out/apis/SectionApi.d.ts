import * as runtime from '../runtime';
import type { ChapterModel, CreateSectionModel, IdSectionModel, SectionModel, UpdateSectionModel } from '../models';
export interface DeleteSectionRequest {
    authorizationToken: string;
    idSectionModel: IdSectionModel;
}
export interface GetSectionRequest {
    id: string;
    authorizationToken: string;
}
export interface GetSectionChaptersRequest {
    id: string;
    authorizationToken: string;
}
export interface RegisterSectionRequest {
    authorizationToken: string;
    createSectionModel: CreateSectionModel;
}
export interface UpdateSectionRequest {
    id: string;
    authorizationToken: string;
    updateSectionModel: UpdateSectionModel;
}
export declare class SectionApi extends runtime.BaseAPI {
    deleteSectionRaw(requestParameters: DeleteSectionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>>;
    deleteSection(requestParameters: DeleteSectionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string>;
    getSectionRaw(requestParameters: GetSectionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<SectionModel>>;
    getSection(requestParameters: GetSectionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SectionModel>;
    getSectionChaptersRaw(requestParameters: GetSectionChaptersRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<ChapterModel>>>;
    getSectionChapters(requestParameters: GetSectionChaptersRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<ChapterModel>>;
    registerSectionRaw(requestParameters: RegisterSectionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>>;
    registerSection(requestParameters: RegisterSectionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string>;
    updateSectionRaw(requestParameters: UpdateSectionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>>;
    updateSection(requestParameters: UpdateSectionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string>;
}
