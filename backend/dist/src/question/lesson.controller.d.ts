import { IdLessonModel, LessonModel } from 'lesson/lesson.dto';
import { LessonService } from 'lesson/lesson.service';
export declare class LessonController {
    private readonly lessonService;
    constructor(lessonService: LessonService);
    registerLesson(body: LessonModel, token: string): Promise<string>;
    deleteLesson(body: IdLessonModel, token: string): Promise<string>;
    getLesson(id: string, token: string): Promise<string>;
    updateLesson(id: string, body: LessonModel): Promise<string>;
}
