import { CreateSectionModel, IdSectionModel, SectionModel, UpdateSectionModel } from 'section/section.dto';
import { ChapterModel } from 'chapter/chapter.dto';
export declare class SectionService {
    postSection(sectionData: CreateSectionModel): Promise<string>;
    deleteSection(sectionData: IdSectionModel): Promise<string>;
    getSection(SectionId: string): Promise<SectionModel>;
    updateSection(SectionId: string, sectionData: UpdateSectionModel): Promise<string>;
    getSectionChapters(SectionId: string): Promise<ChapterModel[]>;
}
