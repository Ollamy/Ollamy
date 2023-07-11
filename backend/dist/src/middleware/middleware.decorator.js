"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggedMiddleware = exports.MIDDLEWARE_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.MIDDLEWARE_KEY = 'allow';
const LoggedMiddleware = (allow = false) => (0, common_1.SetMetadata)(exports.MIDDLEWARE_KEY, allow);
exports.LoggedMiddleware = LoggedMiddleware;
//# sourceMappingURL=middleware.decorator.js.map