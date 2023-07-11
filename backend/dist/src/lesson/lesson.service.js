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
const client_2 = require("@prisma/client");
let LessonService = class LessonService {
    async postLesson(lessonData) {
        try {
            const lessonDb = await client_1.default.lesson.create({
                data: {
                    chapter_id: lessonData.chapterId,
                    title: lessonData.title,
                    description: lessonData.description,
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
    async deleteLesson(lessonData) {
        try {
            const lessonDb = await client_1.default.lesson.delete({
                where: Object.assign({}, lessonData),
            });
            if (!lessonDb) {
                common_1.Logger.error('Lesson does not exists !');
                throw new common_1.NotFoundException('Lesson does not exists !');
            }
            return `Lesson's ${lessonData.id} has been deleted.`;
        }
        catch (error) {
            common_1.Logger.error(error);
            if (error instanceof client_2.Prisma.PrismaClientKnownRequestError) {
                throw new common_1.ConflictException('Lesson already removed !');
            }
            throw new common_1.ConflictException('Lesson not created !');
        }
    }
    async getLesson(LessonId) {
        try {
            const lessonDb = await client_1.default.lesson.findFirst({
                where: {
                    id: LessonId,
                },
            });
            if (!lessonDb) {
                common_1.Logger.error('Lesson does not exists !');
                throw new common_1.ConflictException('Lesson does not exists !');
            }
            return Object.assign({ chapterId: lessonDb.chapter_id }, lessonDb);
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
                    id: LessonId,
                },
                data: lessonData,
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
    async getLessonQuestions(LessonId) {
        try {
            const lessonQuestionsDb = await client_1.default.question.findMany({
                where: {
                    lesson_id: LessonId,
                },
            });
            if (!lessonQuestionsDb) {
                common_1.Logger.error('No questions for this course !');
                throw new common_1.NotFoundException('No questions for this course !');
            }
            return lessonQuestionsDb.map((question) => {
                return {
                    id: question.id,
                    lessonId: question.lesson_id,
                    title: question.title,
                    description: question.description,
                    typeAnswer: question.type_answer,
                    typeQuestion: question.type_question,
                    data: question.data,
                };
            });
        }
        catch (error) {
            common_1.Logger.error(error);
            throw new common_1.NotFoundException('Lessons not found !');
        }
    }
};
LessonService = __decorate([
    (0, common_1.Injectable)()
], LessonService);
exports.LessonService = LessonService;
//# sourceMappingURL=lesson.service.js.map