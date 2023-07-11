import * as runtime from '../runtime';
import type { CreateUserModel, LoginUserModel, UpdateUserModel } from '../models';
export interface DeleteUserRequest {
    authorizationToken: string;
}
export interface LoginUserRequest {
    loginUserModel: LoginUserModel;
}
export interface RegisterUserRequest {
    createUserModel: CreateUserModel;
}
export interface UpdateUserRequest {
    authorizationToken: string;
    updateUserModel: UpdateUserModel;
}
export declare class UserApi extends runtime.BaseAPI {
    deleteUserRaw(requestParameters: DeleteUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>>;
    deleteUser(requestParameters: DeleteUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string>;
    loginUserRaw(requestParameters: LoginUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>>;
    loginUser(requestParameters: LoginUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string>;
    registerUserRaw(requestParameters: RegisterUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>>;
    registerUser(requestParameters: RegisterUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string>;
    updateUserRaw(requestParameters: UpdateUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>>;
    updateUser(requestParameters: UpdateUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string>;
}
