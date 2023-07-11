"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("../client");
const client_2 = require("@prisma/client");
let CourseService = class CourseService {
    async postCourse(courseData, ctx) {
        try {
            const courseDb = await client_1.default.course.create({
                data: Object.assign({ owner_id: ctx.__user.id }, courseData),
            });
            if (!courseDb) {
                common_1.Logger.error('Failed to create course !');
                throw new common_1.NotFoundException('Failed to create course !');
            }
            return `Course created with id ${courseDb.id}`;
        }
        catch (error) {
            common_1.Logger.error(error);
            throw new common_1.ConflictException('Course not created !');
        }
    }
    async deleteCourse(courseId) {
        try {
            const courseDb = await client_1.default.course.delete({
                where: Object.assign({}, courseId),
            });
            if (!courseDb) {
                common_1.Logger.error('Course does not exists !');
                throw new common_1.NotFoundException('Course does not exists !');
            }
            return `Course's ${courseId.id} has been deleted.`;
        }
        catch (error) {
            common_1.Logger.error(error);
            if (error instanceof client_2.Prisma.PrismaClientKnownRequestError) {
                throw new common_1.ConflictException('Course already removed !');
            }
            throw new common_1.ConflictException('Course not created !');
        }
    }
    async getCourse(CourseId) {
        try {
            const courseDb = await client_1.default.course.findFirst({
                where: {
                    id: CourseId,
                },
            });
            if (!courseDb) {
                common_1.Logger.error('Course does not exists !');
                throw new common_1.ConflictException('Course does not exists !');
            }
            return Object.assign({ ownerId: courseDb.owner_id }, courseDb);
        }
        catch (error) {
            common_1.Logger.error(error);
            throw new common_1.ConflictException('Course not deleted !');
        }
    }
    async updateCourse(CourseId, courseData) {
        try {
            const courseDb = await client_1.default.course.update({
                where: {
                    id: CourseId,
                },
                data: courseData,
            });
            if (!courseDb) {
                common_1.Logger.error('Course does not exists !');
                throw new common_1.ConflictException('Course does not exists !');
            }
            return `Course with id ${CourseId} has been updated`;
        }
        catch (error) {
            common_1.Logger.error(error);
            throw new common_1.ConflictException('Course not updated !');
        }
    }
    async getCourseSections(CourseId) {
        try {
            const courseSectionsDb = await client_1.default.section.findMany({
                where: {
                    course_id: CourseId,
                },
            });
            if (!courseSectionsDb) {
                common_1.Logger.error('No sections for this course !');
                throw new common_1.NotFoundException('No sections for this course !');
            }
            return courseSectionsDb.map((lesson) => {
                return Object.assign({ courseId: lesson.course_id }, lesson);
            });
        }
        catch (error) {
            common_1.Logger.error(error);
            throw new common_1.NotFoundException('Sections not found !');
        }
    }
};
CourseService = __decorate([
    (0, common_1.Injectable)()
], CourseService);
exports.CourseService = CourseService;
//# sourceMappingURL=course.service.js.map