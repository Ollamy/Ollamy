import { CreateQuestionModel, IdQuestionModel, QuestionModel, UpdateQuestionModel } from 'question/question.dto';
import { QuestionService } from 'question/question.service';
export declare class QuestionController {
    private readonly questionService;
    constructor(questionService: QuestionService);
    registerQuestion(body: CreateQuestionModel): Promise<string>;
    deleteQuestion(body: IdQuestionModel): Promise<string>;
    getQuestion(id: string): Promise<QuestionModel>;
    updateQuestion(id: string, body: UpdateQuestionModel): Promise<string>;
}
