import { CreateQuestionModel, IdQuestionModel, QuestionModel, UpdateQuestionModel } from './question.dto';
export declare class QuestionService {
    postQuestion(questionData: CreateQuestionModel): Promise<string>;
    deleteQuestion(questionId: IdQuestionModel): Promise<string>;
    getQuestion(QuestionId: string): Promise<QuestionModel>;
    updateQuestion(QuestionId: string, questionData: UpdateQuestionModel): Promise<string>;
}
