"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const client_1 = require("./client");
let LoggingMiddleware = class LoggingMiddleware {
    use(req, _, next) {
        const token = req.headers.authorization_token;
        console.log('token = ', token);
        if (!token) {
            common_1.Logger.error('No token provided');
            throw new common_1.NotAcceptableException('No token provided');
        }
        const parsedJwt = jwt.decode(token);
        const user = client_1.default.user.findUnique({
            where: {
                id: parsedJwt['id'],
                email: parsedJwt['email'],
            },
        });
        console.log(parsedJwt);
        if (!user) {
            common_1.Logger.error('User does not exists !');
            throw new common_1.NotAcceptableException('Invalid Token');
        }
        console.log('Request Received');
        next();
    }
};
LoggingMiddleware = __decorate([
    (0, common_1.Injectable)()
], LoggingMiddleware);
exports.LoggingMiddleware = LoggingMiddleware;
//# sourceMappingURL=middleware.js.map