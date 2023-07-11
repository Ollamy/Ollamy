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
exports.LessonController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const lesson_dto_1 = require("./lesson.dto");
const lesson_service_1 = require("./lesson.service");
const middleware_decorator_1 = require("../middleware/middleware.decorator");
const question_dto_1 = require("../question/question.dto");
let LessonController = class LessonController {
    constructor(lessonService) {
        this.lessonService = lessonService;
    }
    async registerLesson(body) {
        return this.lessonService.postLesson(body);
    }
    async deleteLesson(body) {
        return this.lessonService.deleteLesson(body);
    }
    async getLesson(id) {
        return this.lessonService.getLesson(id);
    }
    async updateLesson(id, body) {
        return this.lessonService.updateLesson(id, body);
    }
    async getLessonQuestions(id) {
        return this.lessonService.getLessonQuestions(id);
    }
};
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: 'lesson create response',
        type: String,
    }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization_token',
        description: 'token',
        required: true,
    }),
    (0, swagger_1.ApiBody)({
        type: lesson_dto_1.CreateLessonModel,
        description: 'user data model',
        examples: {
            template: {
                value: {
                    chapterId: 'Chapter Id',
                    title: 'Lesson Title',
                    description: 'Lesson decsription',
                },
            },
        },
    }),
    (0, middleware_decorator_1.LoggedMiddleware)(true),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [lesson_dto_1.CreateLessonModel]),
    __metadata("design:returntype", Promise)
], LessonController.prototype, "registerLesson", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: 'lesson delete response',
        type: String,
    }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization_token',
        description: 'token',
        required: true,
    }),
    (0, swagger_1.ApiBody)({
        type: lesson_dto_1.IdLessonModel,
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
    __metadata("design:paramtypes", [lesson_dto_1.IdLessonModel]),
    __metadata("design:returntype", Promise)
], LessonController.prototype, "deleteLesson", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: 'lesson content response',
        type: lesson_dto_1.LessonModel,
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Id of the lesson',
        required: true,
    }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization_token',
        description: 'token',
        required: true,
    }),
    (0, middleware_decorator_1.LoggedMiddleware)(true),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LessonController.prototype, "getLesson", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: 'lesson update response',
        type: String,
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Id of the lesson',
        required: true,
    }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization_token',
        description: 'token',
        required: true,
    }),
    (0, swagger_1.ApiBody)({
        type: lesson_dto_1.LessonModel,
        description: 'user data model',
        examples: {
            template: {
                value: {
                    chapterId: 'id',
                    title: 'Lesson Title',
                    description: 'Lesson decsription',
                },
            },
        },
    }),
    (0, middleware_decorator_1.LoggedMiddleware)(true),
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, lesson_dto_1.LessonModel]),
    __metadata("design:returntype", Promise)
], LessonController.prototype, "updateLesson", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: "lesson's questions",
        type: [question_dto_1.QuestionModel],
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Id of the lesson',
        required: true,
    }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization_token',
        description: 'token',
        required: true,
    }),
    (0, middleware_decorator_1.LoggedMiddleware)(true),
    (0, common_1.Get)('/questions/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LessonController.prototype, "getLessonQuestions", null);
LessonController = __decorate([
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Parameters are not valid' }),
    (0, swagger_1.ApiTags)('Lesson'),
    (0, common_1.Controller)('/lesson'),
    __metadata("design:paramtypes", [lesson_service_1.LessonService])
], LessonController);
exports.LessonController = LessonController;
//# sourceMappingURL=lesson.controller.js.map