"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiddlewareGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const client_1 = require("../client");
const setup_1 = require("../setup");
const core_1 = require("@nestjs/core");
const middleware_decorator_1 = require("./middleware.decorator");
let MiddlewareGuard = class MiddlewareGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    async canActivate(context) {
        const allow = this.reflector.getAllAndOverride(middleware_decorator_1.MIDDLEWARE_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!allow) {
            return true;
        }
        const req = context.switchToHttp().getRequest();
        const token = req.headers.authorization_token;
        if (!token) {
            common_1.Logger.error('No token provided');
            throw new common_1.NotAcceptableException('No token provided');
        }
        try {
            const verify = jwt.verify(token, setup_1.SECRET_KEY);
            if (!verify) {
                common_1.Logger.error('Invalid Token');
                throw new common_1.NotAcceptableException('Invalid Token');
            }
        }
        catch (error) {
            common_1.Logger.error('Jwt not accepted, can be malformed, expired or invalid');
            throw new common_1.NotAcceptableException('Jwt not accepted, can be malformed, expired or invalid');
        }
        const parsedJwt = jwt.decode(token);
        const user = client_1.default.user.findUnique({
            where: {
                id: parsedJwt['id'],
            },
        });
        if (!user) {
            common_1.Logger.error('User does not exists for this token !');
            throw new common_1.NotAcceptableException('Invalid Token');
        }
        req.__user = await user;
        const userToCourse = client_1.default.usertoCourse.findMany({
            where: {
                user_id: req.__user.id,
            },
        });
        if (!userToCourse) {
            common_1.Logger.error('Cannot find course for this user !');
            throw new common_1.NotAcceptableException('Invalid Token');
        }
        req.__userToCourse = await userToCourse;
        return true;
    }
};
MiddlewareGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], MiddlewareGuard);
exports.MiddlewareGuard = MiddlewareGuard;
//# sourceMappingURL=middleware.guard.js.map