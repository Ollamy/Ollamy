import { IdLessonModel, LessonModel, UpdateLessonModel } from './lesson.dto';
export declare class LessonService {
    postLesson(lessonData: LessonModel, token: string): Promise<string>;
    deleteLesson(lessonData: IdLessonModel, token: string): Promise<string>;
    getLesson(LessonId: string, token: string): Promise<string>;
    updateLesson(LessonId: string, lessonData: UpdateLessonModel): Promise<string>;
}
