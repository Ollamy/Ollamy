"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("../client");
const jwt = require("jsonwebtoken");
const client_2 = require("@prisma/client");
let LessonService = class LessonService {
    async postLesson(lessonData, token) {
        const parsedJwt = jwt.decode(token);
        if (!parsedJwt) {
            common_1.Logger.error('Token not valid !');
            throw new common_1.BadRequestException('Token not valid !');
        }
        try {
            const lessonDb = await client_1.default.lesson.create({
                data: {
                    chapter_id: parsedJwt['id'],
                    title: lessonData.Title,
                    description: lessonData.Description,
                    data: lessonData.Data
                },
            });
            if (!lessonDb) {
                common_1.Logger.error('Failed to create lesson !');
                throw new common_1.NotFoundException('Failed to create lesson !');
            }
            return `Lesson created with id ${lessonDb.id}`;
        }
        catch (error) {
            common_1.Logger.error(error);
            throw new common_1.ConflictException('Lesson not created !');
        }
    }
    async deleteLesson(lessonData, token) {
        const parsedJwt = jwt.decode(token);
        if (!parsedJwt) {
            common_1.Logger.error('Token not valid !');
            throw new common_1.BadRequestException('Token not valid !');
        }
        try {
            const lessonDb = await client_1.default.lesson.delete({
                where: {
                    id: lessonData.Id,
                },
            });
            if (!lessonDb) {
                common_1.Logger.error('Lesson does not exists !');
                throw new common_1.NotFoundException('Lesson does not exists !');
            }
            return `Lesson's ${lessonData.Id} has been deleted.`;
        }
        catch (error) {
            common_1.Logger.error(error);
            if (error instanceof client_2.Prisma.PrismaClientKnownRequestError) {
                throw new common_1.ConflictException('Lesson already removed !');
            }
            else {
                throw new common_1.ConflictException('Lesson not created !');
            }
        }
    }
    async getLesson(LessonId, token) {
        const parsedJwt = jwt.decode(token);
        if (!parsedJwt) {
            common_1.Logger.error('Token not valid !');
            throw new common_1.BadRequestException('Token not valid !');
        }
        try {
            const lessonDb = await client_1.default.lesson.findFirst({
                where: {
                    id: LessonId
                },
            });
            if (!lessonDb) {
                common_1.Logger.error('Lesson does not exists !');
                throw new common_1.ConflictException('Lesson does not exists !');
            }
            const lesson = {
                Id: lessonDb.id,
                ChapterId: lessonDb.chapter_id,
                Title: lessonDb.title,
                Description: lessonDb.description,
                Data: lessonDb.data
            };
            return JSON.stringify(lesson);
        }
        catch (error) {
            common_1.Logger.error(error);
            throw new common_1.ConflictException('Lesson not found !');
        }
    }
    async updateLesson(LessonId, lessonData) {
        try {
            const lessonDb = await client_1.default.lesson.update({
                where: {
                    id: LessonId
                }, data: {
                    chapter_id: lessonData.ChapterId,
                    title: lessonData.Title,
                    description: lessonData.Description,
                    data: lessonData.Data
                }
            });
            if (!lessonDb) {
                common_1.Logger.error('Lesson does not exists !');
                throw new common_1.ConflictException('Lesson does not exists !');
            }
            return `Lesson with id ${LessonId} has been updated`;
        }
        catch (error) {
            common_1.Logger.error(error);
            throw new common_1.ConflictException('Lesson not updated !');
        }
    }
};
LessonService = __decorate([
    (0, common_1.Injectable)()
], LessonService);
exports.LessonService = LessonService;
//# sourceMappingURL=lesson.service.js.map