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
exports.SectionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const section_dto_1 = require("./section.dto");
const section_service_1 = require("./section.service");
const middleware_decorator_1 = require("../middleware/middleware.decorator");
const chapter_dto_1 = require("../chapter/chapter.dto");
let SectionController = class SectionController {
    constructor(sectionService) {
        this.sectionService = sectionService;
    }
    async registerSection(body) {
        return this.sectionService.postSection(body);
    }
    async deleteSection(body) {
        return this.sectionService.deleteSection(body);
    }
    async getSection(id) {
        return this.sectionService.getSection(id);
    }
    async updateSection(id, body) {
        return this.sectionService.updateSection(id, body);
    }
    async getSectionChapters(id) {
        return this.sectionService.getSectionChapters(id);
    }
};
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: 'section create response',
        type: String,
    }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization_token',
        description: 'token',
        required: true,
    }),
    (0, swagger_1.ApiBody)({
        type: section_dto_1.CreateSectionModel,
        description: 'user data model',
        examples: {
            template: {
                value: {
                    courseId: 'Course Id',
                    title: 'Section Title',
                    description: 'Section decsription',
                },
            },
        },
    }),
    (0, middleware_decorator_1.LoggedMiddleware)(true),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [section_dto_1.CreateSectionModel]),
    __metadata("design:returntype", Promise)
], SectionController.prototype, "registerSection", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: 'section delete response',
        type: String,
    }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization_token',
        description: 'token',
        required: true,
    }),
    (0, swagger_1.ApiBody)({
        type: section_dto_1.IdSectionModel,
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
    __metadata("design:paramtypes", [section_dto_1.IdSectionModel]),
    __metadata("design:returntype", Promise)
], SectionController.prototype, "deleteSection", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: 'section content response',
        type: section_dto_1.SectionModel,
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Id of the section',
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
], SectionController.prototype, "getSection", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: 'section update response',
        type: String,
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Id of the section',
        required: true,
    }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization_token',
        description: 'token',
        required: true,
    }),
    (0, swagger_1.ApiBody)({
        type: section_dto_1.UpdateSectionModel,
        description: 'user data model',
        examples: {
            template: {
                value: {
                    courseId: 'id',
                    title: 'Section Title',
                    description: 'Section decsription',
                },
            },
        },
    }),
    (0, middleware_decorator_1.LoggedMiddleware)(true),
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, section_dto_1.UpdateSectionModel]),
    __metadata("design:returntype", Promise)
], SectionController.prototype, "updateSection", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: "section's chapters",
        type: [chapter_dto_1.ChapterModel],
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Id of the section',
        required: true,
    }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization_token',
        description: 'token',
        required: true,
    }),
    (0, middleware_decorator_1.LoggedMiddleware)(true),
    (0, common_1.Get)('/chapters/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SectionController.prototype, "getSectionChapters", null);
SectionController = __decorate([
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Parameters are not valid' }),
    (0, swagger_1.ApiTags)('Section'),
    (0, common_1.Controller)('/section'),
    __metadata("design:paramtypes", [section_service_1.SectionService])
], SectionController);
exports.SectionController = SectionController;
//# sourceMappingURL=section.controller.js.map