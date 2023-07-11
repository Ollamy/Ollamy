import { ChapterModel, IdChapterModel, UpdateChapterModel, CreateChapterModel } from 'chapter/chapter.dto';
import { ChapterService } from 'chapter/chapter.service';
import { LessonModel } from 'lesson/lesson.dto';
export declare class ChapterController {
    private readonly chapterService;
    constructor(chapterService: ChapterService);
    registerChapter(body: CreateChapterModel): Promise<string>;
    deleteChapter(body: IdChapterModel): Promise<string>;
    getChapter(id: string): Promise<ChapterModel>;
    updateChapter(id: string, body: UpdateChapterModel): Promise<string>;
    getChapterLessons(id: string): Promise<LessonModel[]>;
}
