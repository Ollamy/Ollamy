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
exports.QuestionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const question_dto_1 = require("./question.dto");
const client_1 = require("@prisma/client");
const question_service_1 = require("./question.service");
const middleware_decorator_1 = require("../middleware/middleware.decorator");
let QuestionController = class QuestionController {
    constructor(questionService) {
        this.questionService = questionService;
    }
    async registerQuestion(body) {
        return this.questionService.postQuestion(body);
    }
    async deleteQuestion(body) {
        return this.questionService.deleteQuestion(body);
    }
    async getQuestion(id) {
        return this.questionService.getQuestion(id);
    }
    async updateQuestion(id, body) {
        return this.questionService.updateQuestion(id, body);
    }
};
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: 'question create response',
        type: String,
    }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization_token',
        description: 'token',
        required: true,
    }),
    (0, swagger_1.ApiBody)({
        type: question_dto_1.CreateQuestionModel,
        description: 'user data model',
        examples: {
            template: {
                value: {
                    lessonId: 'Lesson Id',
                    title: 'Question Title',
                    description: 'Question decsription',
                    data: 'Question data',
                    typeAnswer: client_1.AnswerType.TEXT,
                    typeQuestion: client_1.QuestionType.TEXT,
                },
            },
        },
    }),
    (0, middleware_decorator_1.LoggedMiddleware)(true),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [question_dto_1.CreateQuestionModel]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "registerQuestion", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: 'question delete response',
        type: String,
    }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization_token',
        description: 'token',
        required: true,
    }),
    (0, swagger_1.ApiBody)({
        type: question_dto_1.IdQuestionModel,
        description: 'user data model',
        examples: {
            template: {
                value: {
                    id: 'id',
                },
            },
        },
    }),
    (0, middleware_decorator_1.LoggedMiddleware)(true),
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [question_dto_1.IdQuestionModel]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "deleteQuestion", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: 'question content response',
        type: question_dto_1.QuestionModel,
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Id of the question',
        required: true,
    }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization_token',
        description: 'token',
        required: true,
    }),
    (0, middleware_decorator_1.LoggedMiddleware)(true),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "getQuestion", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: 'question update response',
        type: String,
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Id of the question',
        required: true,
    }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization_token',
        description: 'token',
        required: true,
    }),
    (0, swagger_1.ApiBody)({
        type: question_dto_1.UpdateQuestionModel,
        description: 'user data model',
        examples: {
            template: {
                value: {
                    lessonId: 'id',
                    title: 'Question Title',
                    description: 'Question decsription',
                    data: 'Data of the question',
                },
            },
        },
    }),
    (0, middleware_decorator_1.LoggedMiddleware)(true),
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Query)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, question_dto_1.UpdateQuestionModel]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "updateQuestion", null);
QuestionController = __decorate([
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Parameters are not valid' }),
    (0, swagger_1.ApiTags)('Question'),
    (0, common_1.Controller)('/question'),
    __metadata("design:paramtypes", [question_service_1.QuestionService])
], QuestionController);
exports.QuestionController = QuestionController;
//# sourceMappingURL=question.controller.js.map