import { CreateSectionModel, IdSectionModel, SectionModel, UpdateSectionModel } from 'section/section.dto';
import { SectionService } from 'section/section.service';
import { ChapterModel } from 'chapter/chapter.dto';
export declare class SectionController {
    private readonly sectionService;
    constructor(sectionService: SectionService);
    registerSection(body: CreateSectionModel): Promise<string>;
    deleteSection(body: IdSectionModel): Promise<string>;
    getSection(id: string): Promise<SectionModel>;
    updateSection(id: string, body: UpdateSectionModel): Promise<string>;
    getSectionChapters(id: string): Promise<ChapterModel[]>;
}
