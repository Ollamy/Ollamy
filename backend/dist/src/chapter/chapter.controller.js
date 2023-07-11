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
exports.ChapterController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const chapter_dto_1 = require("./chapter.dto");
const chapter_service_1 = require("./chapter.service");
const lesson_dto_1 = require("../lesson/lesson.dto");
const middleware_decorator_1 = require("../middleware/middleware.decorator");
let ChapterController = class ChapterController {
    constructor(chapterService) {
        this.chapterService = chapterService;
    }
    async registerChapter(body) {
        return this.chapterService.postChapter(body);
    }
    async deleteChapter(body) {
        return this.chapterService.deleteChapter(body);
    }
    async getChapter(id) {
        return this.chapterService.getChapter(id);
    }
    async updateChapter(id, body) {
        return this.chapterService.updateChapter(id, body);
    }
    async getChapterLessons(id) {
        return this.chapterService.getChapterLessons(id);
    }
};
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: 'chapter create response',
        type: String,
    }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization_token',
        description: 'token',
        required: true,
    }),
    (0, swagger_1.ApiBody)({
        type: chapter_dto_1.CreateChapterModel,
        description: 'user data model',
        examples: {
            template: {
                value: {
                    sectionId: 'Section Id',
                    title: 'Chapter Title',
                    description: 'Chapter description',
                },
            },
        },
    }),
    (0, middleware_decorator_1.LoggedMiddleware)(true),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chapter_dto_1.CreateChapterModel]),
    __metadata("design:returntype", Promise)
], ChapterController.prototype, "registerChapter", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: 'chapter delete response',
        type: String,
    }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization_token',
        description: 'token',
        required: true,
    }),
    (0, swagger_1.ApiBody)({
        type: chapter_dto_1.IdChapterModel,
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
    __metadata("design:paramtypes", [chapter_dto_1.IdChapterModel]),
    __metadata("design:returntype", Promise)
], ChapterController.prototype, "deleteChapter", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: 'chapter content',
        type: chapter_dto_1.ChapterModel,
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Id of the chapter',
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
], ChapterController.prototype, "getChapter", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: 'chapter update response',
        type: String,
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Id of the chapter',
        required: true,
    }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization_token',
        description: 'token',
        required: true,
    }),
    (0, swagger_1.ApiBody)({
        type: chapter_dto_1.UpdateChapterModel,
        description: 'user data model',
        examples: {
            template: {
                value: {
                    sectionId: 'id',
                    title: 'Chapter Title',
                    description: 'Chapter description',
                },
            },
        },
    }),
    (0, middleware_decorator_1.LoggedMiddleware)(true),
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, chapter_dto_1.UpdateChapterModel]),
    __metadata("design:returntype", Promise)
], ChapterController.prototype, "updateChapter", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: "chapter's lessons",
        type: [lesson_dto_1.LessonModel],
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Id of the chapter',
        required: true,
    }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization_token',
        description: 'token',
        required: true,
    }),
    (0, middleware_decorator_1.LoggedMiddleware)(true),
    (0, common_1.Get)('/lessons/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChapterController.prototype, "getChapterLessons", null);
ChapterController = __decorate([
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Parameters are not valid' }),
    (0, swagger_1.ApiTags)('Chapter'),
    (0, common_1.Controller)('/chapter'),
    __metadata("design:paramtypes", [chapter_service_1.ChapterService])
], ChapterController);
exports.ChapterController = ChapterController;
//# sourceMappingURL=chapter.controller.js.map