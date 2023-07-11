import { CreateChapterModel, ChapterModel, IdChapterModel, UpdateChapterModel } from './chapter.dto';
import { LessonModel } from 'lesson/lesson.dto';
export declare class ChapterService {
    postChapter(chapterData: CreateChapterModel): Promise<string>;
    deleteChapter(chapterId: IdChapterModel): Promise<string>;
    getChapter(ChapterId: string): Promise<ChapterModel>;
    updateChapter(ChapterId: string, chapterData: UpdateChapterModel): Promise<string>;
    getChapterLessons(ChapterId: string): Promise<LessonModel[]>;
}
