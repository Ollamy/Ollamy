import * as runtime from '../runtime';
export declare class DefaultApi extends runtime.BaseAPI {
    healthCheckRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>>;
    healthCheck(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void>;
}
