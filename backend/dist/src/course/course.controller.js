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
exports.CourseController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const course_dto_1 = require("./course.dto");
const section_dto_1 = require("../section/section.dto");
const course_service_1 = require("./course.service");
const middleware_decorator_1 = require("../middleware/middleware.decorator");
const context_decorator_1 = require("../context/context.decorator");
let CourseController = class CourseController {
    constructor(courseService) {
        this.courseService = courseService;
    }
    async postCourse(body, ctx) {
        return this.courseService.postCourse(body, ctx);
    }
    async deleteCourse(body) {
        return this.courseService.deleteCourse(body);
    }
    async getCourse(id) {
        return this.courseService.getCourse(id);
    }
    async updateCourse(id, body) {
        return this.courseService.updateCourse(id, body);
    }
    async getCourseSections(id) {
        return this.courseService.getCourseSections(id);
    }
};
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: 'course create response',
        type: String,
    }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization_token',
        description: 'token',
        required: true,
    }),
    (0, swagger_1.ApiBody)({
        type: course_dto_1.CreateCourseModel,
        description: 'user data model',
        examples: {
            template: {
                value: {
                    title: 'Course Title',
                    description: 'Course description',
                },
            },
        },
    }),
    (0, middleware_decorator_1.LoggedMiddleware)(true),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, context_decorator_1.OllContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [course_dto_1.CreateCourseModel, Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "postCourse", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: 'course delete response',
        type: String,
    }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization_token',
        description: 'token',
        required: true,
    }),
    (0, swagger_1.ApiBody)({
        type: course_dto_1.IdCourseModel,
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
    __metadata("design:paramtypes", [course_dto_1.IdCourseModel]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "deleteCourse", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: 'course content response',
        type: course_dto_1.CourseModel,
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Id of the course',
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
], CourseController.prototype, "getCourse", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: 'course update response',
        type: String,
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Id of the course',
        required: true,
    }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization_token',
        description: 'token',
        required: true,
    }),
    (0, swagger_1.ApiBody)({
        type: course_dto_1.UpdateCourseModel,
        description: 'user data model',
        examples: {
            template: {
                value: {
                    ownerId: 'id',
                    title: 'Course Title',
                    description: 'Course description',
                },
            },
        },
    }),
    (0, middleware_decorator_1.LoggedMiddleware)(true),
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, course_dto_1.UpdateCourseModel]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "updateCourse", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: "course's sections",
        type: [section_dto_1.SectionModel],
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Id of the course',
        required: true,
    }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization_token',
        description: 'token',
        required: true,
    }),
    (0, middleware_decorator_1.LoggedMiddleware)(true),
    (0, common_1.Get)('/sections/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getCourseSections", null);
CourseController = __decorate([
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Parameters are not valid' }),
    (0, swagger_1.ApiTags)('Course'),
    (0, common_1.Controller)('/course'),
    __metadata("design:paramtypes", [course_service_1.CourseService])
], CourseController);
exports.CourseController = CourseController;
//# sourceMappingURL=course.controller.js.map