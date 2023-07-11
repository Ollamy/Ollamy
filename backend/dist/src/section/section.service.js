"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("../client");
const client_2 = require("@prisma/client");
let SectionService = class SectionService {
    async postSection(sectionData) {
        try {
            const sectionDb = await client_1.default.section.create({
                data: {
                    course_id: sectionData.courseId,
                    title: sectionData.title,
                    description: sectionData.description,
                },
            });
            if (!sectionDb) {
                common_1.Logger.error('Failed to create section !');
                throw new common_1.NotFoundException('Failed to create section !');
            }
            return `Section created with id ${sectionDb.id}`;
        }
        catch (error) {
            common_1.Logger.error(error);
            throw new common_1.ConflictException('Section not created !');
        }
    }
    async deleteSection(sectionData) {
        try {
            const sectionDb = await client_1.default.section.delete({
                where: Object.assign({}, sectionData),
            });
            if (!sectionDb) {
                common_1.Logger.error('Section does not exists !');
                throw new common_1.NotFoundException('Section does not exists !');
            }
            return `Section's ${sectionData.id} has been deleted.`;
        }
        catch (error) {
            common_1.Logger.error(error);
            if (error instanceof client_2.Prisma.PrismaClientKnownRequestError) {
                throw new common_1.ConflictException('Section already removed !');
            }
            throw new common_1.ConflictException('Section not created !');
        }
    }
    async getSection(SectionId) {
        try {
            const sectionDb = await client_1.default.section.findFirst({
                where: {
                    id: SectionId,
                },
            });
            if (!sectionDb) {
                common_1.Logger.error('Section does not exists !');
                throw new common_1.ConflictException('Section does not exists !');
            }
            return {
                courseId: sectionDb.course_id,
                description: sectionDb.description,
                id: sectionDb.id,
                title: sectionDb.title,
            };
        }
        catch (error) {
            common_1.Logger.error(error);
            throw new common_1.ConflictException('Section not found !');
        }
    }
    async updateSection(SectionId, sectionData) {
        try {
            const sectionDb = await client_1.default.section.update({
                where: {
                    id: SectionId,
                },
                data: sectionData,
            });
            if (!sectionDb) {
                common_1.Logger.error('Section does not exists !');
                throw new common_1.ConflictException('Section does not exists !');
            }
            return `Section with id ${SectionId} has been updated`;
        }
        catch (error) {
            common_1.Logger.error(error);
            throw new common_1.ConflictException('Section not updated !');
        }
    }
    async getSectionChapters(SectionId) {
        try {
            const sectionChaptersDb = await client_1.default.chapter.findMany({
                where: {
                    section_id: SectionId,
                },
            });
            if (!sectionChaptersDb) {
                common_1.Logger.error('No chapters for this course !');
                throw new common_1.NotFoundException('No chapters for this course !');
            }
            return sectionChaptersDb.map((lesson) => {
                return {
                    sectionId: lesson.section_id,
                    description: lesson.description,
                    id: lesson.id,
                    title: lesson.title,
                };
            });
        }
        catch (error) {
            common_1.Logger.error(error);
            throw new common_1.NotFoundException('Chapters not found !');
        }
    }
};
SectionService = __decorate([
    (0, common_1.Injectable)()
], SectionService);
exports.SectionService = SectionService;
//# sourceMappingURL=section.service.js.map