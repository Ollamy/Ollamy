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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const context_decorator_1 = require("../context/context.decorator");
const middleware_decorator_1 = require("../middleware/middleware.decorator");
const user_dto_1 = require("./user.dto");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async registerUser(body) {
        return this.userService.registerUser(body);
    }
    async loginUser(body) {
        return this.userService.loginUser(body);
    }
    async getUser(ctx) {
        return this.userService.getUser(ctx);
    }
    async updateUser(body, ctx) {
        return this.userService.updateUser(body, ctx);
    }
    async deleteUser(ctx) {
        return this.userService.deleteUser(ctx);
    }
};
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: "user's token",
        type: String,
    }),
    (0, swagger_1.ApiBody)({
        type: user_dto_1.CreateUserModel,
        description: 'user data model',
        examples: {
            template: {
                value: {
                    firstname: 'name',
                    lastname: 'lastname',
                    email: 'test@test.test',
                    password: '1234aaBB@',
                },
            },
        },
    }),
    (0, common_1.Post)('/register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateUserModel]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "registerUser", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: "user's token",
        type: String,
    }),
    (0, swagger_1.ApiBody)({
        type: user_dto_1.LoginUserModel,
        description: 'user data model',
        examples: {
            template: {
                value: {
                    email: 'test@test.test',
                    password: '1234aaBB@',
                },
            },
        },
    }),
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.LoginUserModel]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "loginUser", null);
__decorate([
    (0, swagger_1.ApiHeader)({
        name: 'Authorization_token',
        description: 'token',
        required: true,
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "user's data",
        type: user_dto_1.GetUserModel,
    }),
    (0, middleware_decorator_1.LoggedMiddleware)(true),
    (0, common_1.Get)(),
    __param(0, (0, context_decorator_1.OllContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: "user's token",
        type: String,
    }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization_token',
        description: 'token',
        required: true,
    }),
    (0, swagger_1.ApiBody)({
        type: user_dto_1.UpdateUserModel,
        description: 'user data model',
        examples: {
            template: {
                value: {
                    firstname: 'name',
                    lastname: 'lastname',
                    email: 'test@test.test',
                    password: '1234',
                },
            },
        },
    }),
    (0, middleware_decorator_1.LoggedMiddleware)(true),
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, context_decorator_1.OllContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UpdateUserModel, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: 'Ok.',
        type: String,
    }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization_token',
        description: 'token',
        required: true,
    }),
    (0, middleware_decorator_1.LoggedMiddleware)(true),
    (0, common_1.Delete)(),
    __param(0, (0, context_decorator_1.OllContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
UserController = __decorate([
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Parameters are not valid' }),
    (0, swagger_1.ApiTags)('User'),
    (0, swagger_1.ApiForbiddenResponse)({
        description: 'User does not have permission to execute this action',
    }),
    (0, common_1.Controller)('/user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map