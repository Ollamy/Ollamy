"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultApi = void 0;
const runtime = require("../runtime");
class DefaultApi extends runtime.BaseAPI {
    async healthCheckRaw(initOverrides) {
        const queryParameters = {};
        const headerParameters = {};
        const response = await this.request({
            path: `/health`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);
        return new runtime.VoidApiResponse(response);
    }
    async healthCheck(initOverrides) {
        await this.healthCheckRaw(initOverrides);
    }
}
exports.DefaultApi = DefaultApi;
//# sourceMappingURL=DefaultApi.js.map