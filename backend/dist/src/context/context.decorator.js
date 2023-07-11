"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OllContext = void 0;
const common_1 = require("@nestjs/common");
exports.OllContext = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request;
});
//# sourceMappingURL=context.decorator.js.map