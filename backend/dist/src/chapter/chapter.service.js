"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChapterService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("../client");
const client_2 = require("@prisma/client");
let ChapterService = class ChapterService {
    async postChapter(chapterData) {
        try {
            const chapterDb = await client_1.default.chapter.create({
                data: {
                    section_id: chapterData.sectionId,
                    title: chapterData.title,
                    description: chapterData.description,
                },
            });
            if (!chapterDb) {
                common_1.Logger.error('Failed to create chapter !');
                throw new common_1.NotFoundException('Failed to create chapter !');
            }
            return `Chapter created with id ${chapterDb.id}`;
        }
        catch (error) {
            common_1.Logger.error(error);
            throw new common_1.ConflictException('Chapter not created !');
        }
    }
    async deleteChapter(chapterId) {
        try {
            const chapterDb = await client_1.default.chapter.delete({
                where: Object.assign({}, chapterId),
            });
            if (!chapterDb) {
                common_1.Logger.error('Chapter does not exists !');
                throw new common_1.NotFoundException('Chapter does not exists !');
            }
            return `Chapter's ${chapterId.id} has been deleted.`;
        }
        catch (error) {
            common_1.Logger.error(error);
            if (error instanceof client_2.Prisma.PrismaClientKnownRequestError) {
                throw new common_1.ConflictException('Chapter already removed !');
            }
            throw new common_1.ConflictException('Chapter not created !');
        }
    }
    async getChapter(ChapterId) {
        try {
            const chapterDb = await client_1.default.chapter.findFirst({
                where: {
                    id: ChapterId,
                },
            });
            if (!chapterDb) {
                common_1.Logger.error('Chapter does not exists !');
                throw new common_1.ConflictException('Chapter does not exists !');
            }
            return Object.assign({ sectionId: chapterDb.section_id }, chapterDb);
        }
        catch (error) {
            common_1.Logger.error(error);
            throw new common_1.ConflictException('Chapter not found !');
        }
    }
    async updateChapter(ChapterId, chapterData) {
        try {
            const chapterDb = await client_1.default.chapter.update({
                where: {
                    id: ChapterId,
                },
                data: chapterData,
            });
            if (!chapterDb) {
                common_1.Logger.error('Chapter does not exists !');
                throw new common_1.ConflictException('Chapter does not exists !');
            }
            return `Chapter with id ${ChapterId} has been updated`;
        }
        catch (error) {
            common_1.Logger.error(error);
            throw new common_1.ConflictException('Chapter not updated !');
        }
    }
    async getChapterLessons(ChapterId) {
        try {
            const courseLessonsDb = await client_1.default.lesson.findMany({
                where: {
                    chapter_id: ChapterId,
                },
            });
            if (!courseLessonsDb) {
                common_1.Logger.error('No lessons for this course !');
                throw new common_1.NotFoundException('No lessons for this course !');
            }
            return courseLessonsDb.map((lesson) => {
                return {
                    id: lesson.id,
                    chapterId: lesson.chapter_id,
                    title: lesson.title,
                    description: lesson.description,
                };
            });
        }
        catch (error) {
            common_1.Logger.error(error);
            throw new common_1.NotFoundException('Lessons not found !');
        }
    }
};
ChapterService = __decorate([
    (0, common_1.Injectable)()
], ChapterService);
exports.ChapterService = ChapterService;
//# sourceMappingURL=chapter.service.js.map