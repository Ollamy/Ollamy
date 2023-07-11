import { CreateLessonModel, IdLessonModel, LessonModel } from 'lesson/lesson.dto';
import { LessonService } from 'lesson/lesson.service';
import { QuestionModel } from 'question/question.dto';
export declare class LessonController {
    private readonly lessonService;
    constructor(lessonService: LessonService);
    registerLesson(body: CreateLessonModel): Promise<string>;
    deleteLesson(body: IdLessonModel): Promise<string>;
    getLesson(id: string): Promise<LessonModel>;
    updateLesson(id: string, body: LessonModel): Promise<string>;
    getLessonQuestions(id: string): Promise<QuestionModel[]>;
}
