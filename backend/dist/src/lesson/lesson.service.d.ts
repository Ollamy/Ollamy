import { CreateLessonModel, IdLessonModel, LessonModel, UpdateLessonModel } from './lesson.dto';
import { QuestionModel } from 'question/question.dto';
export declare class LessonService {
    postLesson(lessonData: CreateLessonModel): Promise<string>;
    deleteLesson(lessonData: IdLessonModel): Promise<string>;
    getLesson(LessonId: string): Promise<LessonModel>;
    updateLesson(LessonId: string, lessonData: UpdateLessonModel): Promise<string>;
    getLessonQuestions(LessonId: string): Promise<QuestionModel[]>;
}
