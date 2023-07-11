"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("../client");
const client_2 = require("@prisma/client");
let QuestionService = class QuestionService {
    async postQuestion(questionData) {
        try {
            const questionDb = await client_1.default.question.create({
                data: {
                    lesson_id: questionData.lessonId,
                    title: questionData.title,
                    description: questionData.description,
                    type_answer: questionData.typeAnswer,
                    type_question: questionData.typeQuestion,
                },
            });
            if (!questionDb) {
                common_1.Logger.error('Failed to create question !');
                throw new common_1.NotFoundException('Failed to create question !');
            }
            return `Question created with id ${questionDb.id}`;
        }
        catch (error) {
            common_1.Logger.error(error);
            throw new common_1.ConflictException('Question not created !');
        }
    }
    async deleteQuestion(questionId) {
        try {
            const questionDb = await client_1.default.question.delete({
                where: Object.assign({}, questionId),
            });
            if (!questionDb) {
                common_1.Logger.error('Question does not exists !');
                throw new common_1.NotFoundException('Question does not exists !');
            }
            return `Question's ${questionId.id} has been deleted.`;
        }
        catch (error) {
            common_1.Logger.error(error);
            if (error instanceof client_2.Prisma.PrismaClientKnownRequestError) {
                throw new common_1.ConflictException('Question already removed !');
            }
            throw new common_1.ConflictException('Question not created !');
        }
    }
    async getQuestion(QuestionId) {
        try {
            const questionDb = await client_1.default.question.findFirst({
                where: {
                    id: QuestionId,
                },
            });
            if (!questionDb) {
                common_1.Logger.error('Question does not exists !');
                throw new common_1.ConflictException('Question does not exists !');
            }
            return {
                id: questionDb.id,
                lessonId: questionDb.lesson_id,
                title: questionDb.title,
                description: questionDb.description,
                typeAnswer: questionDb.type_answer,
                typeQuestion: questionDb.type_question,
                trustAnswerId: questionDb.trust_answer_id,
            };
        }
        catch (error) {
            common_1.Logger.error(error);
            throw new common_1.ConflictException('Question not found !');
        }
    }
    async updateQuestion(QuestionId, questionData) {
        try {
            const questionDb = await client_1.default.question.update({
                where: {
                    id: QuestionId,
                },
                data: questionData,
            });
            if (!questionDb) {
                common_1.Logger.error('Question does not exists !');
                throw new common_1.ConflictException('Question does not exists !');
            }
            return `Question with id ${QuestionId} has been updated`;
        }
        catch (error) {
            common_1.Logger.error(error);
            throw new common_1.ConflictException('Question not updated !');
        }
    }
};
QuestionService = __decorate([
    (0, common_1.Injectable)()
], QuestionService);
exports.QuestionService = QuestionService;
//# sourceMappingURL=question.service.js.map