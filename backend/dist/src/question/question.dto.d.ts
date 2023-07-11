import { AnswerType, QuestionType } from '@prisma/client';
export declare class QuestionModel {
    id: string;
    lessonId: string;
    title: string;
    description: string;
    data: string;
    typeAnswer: AnswerType;
    typeQuestion: QuestionType;
    trustAnswerId: string;
}
export declare class CreateQuestionModel {
    lessonId: string;
    title: string;
    description: string;
    data: string;
    typeAnswer: AnswerType;
    typeQuestion: QuestionType;
}
export declare class IdQuestionModel {
    id: string;
}
export declare class UpdateQuestionModel {
    lessonId: string;
    title: string;
    description: string;
    data: string;
}
export declare class CreateAnswerModel {
    value: string;
    questionId: string;
    point: number;
}
