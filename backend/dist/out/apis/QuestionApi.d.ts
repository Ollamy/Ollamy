import * as runtime from '../runtime';
import type { CreateQuestionModel, IdQuestionModel, QuestionModel, UpdateQuestionModel } from '../models';
export interface DeleteQuestionRequest {
    authorizationToken: string;
    idQuestionModel: IdQuestionModel;
}
export interface GetQuestionRequest {
    id: string;
    authorizationToken: string;
}
export interface RegisterQuestionRequest {
    authorizationToken: string;
    createQuestionModel: CreateQuestionModel;
}
export interface UpdateQuestionRequest {
    id: string;
    authorizationToken: string;
    updateQuestionModel: UpdateQuestionModel;
}
export declare class QuestionApi extends runtime.BaseAPI {
    deleteQuestionRaw(requestParameters: DeleteQuestionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>>;
    deleteQuestion(requestParameters: DeleteQuestionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string>;
    getQuestionRaw(requestParameters: GetQuestionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<QuestionModel>>;
    getQuestion(requestParameters: GetQuestionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<QuestionModel>;
    registerQuestionRaw(requestParameters: RegisterQuestionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>>;
    registerQuestion(requestParameters: RegisterQuestionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string>;
    updateQuestionRaw(requestParameters: UpdateQuestionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>>;
    updateQuestion(requestParameters: UpdateQuestionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string>;
}
