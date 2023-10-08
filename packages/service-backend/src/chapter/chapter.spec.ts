import { Test } from '@nestjs/testing';
import { Chapter, Course, Lesson, Section } from '@prisma/client';
import prisma from 'client';
import { ConflictException, NotFoundException } from '@nestjs/common';

import { ChapterService } from './chapter.service';
import {
  ChapterModel,
  CreateChapterModel,
  IdChapterModel,
  UpdateChapterModel,
} from './chapter.dto';

describe('postChapter', () => {
  let chapterService: ChapterService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [ChapterService],
    }).compile();

    chapterService = moduleRef.get<ChapterService>(ChapterService);
  });

  it('should create a new chapter and return the success message', async () => {
    // Mock the dependencies or services
    const mockChapterData: CreateChapterModel = {
      sectionId: '1',
      title: 'Chapter 1',
      description: 'Chapter description',
    };
    const mockChapterDb: Chapter = {
      id: '1',
      section_id: mockChapterData.sectionId,
      title: mockChapterData.title,
      description: mockChapterData.description,
      // other chapter properties
    };
    jest.spyOn(prisma.chapter, 'create').mockResolvedValue(mockChapterDb);

    // Invoke the function being tested
    const result = await chapterService.postChapter(mockChapterData);

    // Perform assertions
    expect(prisma.chapter.create).toHaveBeenCalledTimes(1);
    expect(prisma.chapter.create).toHaveBeenCalledWith({
      data: {
        section_id: mockChapterData.sectionId,
        title: mockChapterData.title,
        description: mockChapterData.description,
      },
    });

    const expectedMessage = `Chapter created with id ${mockChapterDb.id}`;
    expect(result).toEqual(expectedMessage);
  });

  it('should throw NotFoundException if chapter creation fails', async () => {
    jest.spyOn(prisma.chapter, 'create').mockResolvedValue(null);

    const mockChapterData: CreateChapterModel = {
      sectionId: '1',
      title: 'Chapter 1',
      description: 'Chapter description',
    };

    await expect(chapterService.postChapter(mockChapterData)).rejects.toThrow(
      ConflictException,
    );
  });

  it('should throw ConflictException if an error occurs', async () => {
    jest
      .spyOn(prisma.chapter, 'create')
      .mockRejectedValue(new Error('Some error'));

    const mockChapterData: CreateChapterModel = {
      sectionId: '1',
      title: 'Chapter 1',
      description: 'Chapter description',
    };

    await expect(chapterService.postChapter(mockChapterData)).rejects.toThrow(
      ConflictException,
    );
  });
});

describe('deleteChapter', () => {
  let chapterService: ChapterService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [ChapterService],
    }).compile();

    chapterService = moduleRef.get<ChapterService>(ChapterService);
  });

  it('should delete the chapter and return the success message', async () => {
    // Mock the dependencies or services
    const mockChapterId: IdChapterModel = {
      id: '1',
    };
    const mockChapterDb: Chapter = {
      id: mockChapterId.id,
      section_id: '1',
      title: 'title',
      description: 'desc',
    };
    jest.spyOn(prisma.chapter, 'delete').mockResolvedValue(mockChapterDb);

    // Invoke the function being tested
    const result = await chapterService.deleteChapter(mockChapterId);

    // Perform assertions
    expect(prisma.chapter.delete).toHaveBeenCalledTimes(1);
    expect(prisma.chapter.delete).toHaveBeenCalledWith({
      where: {
        id: mockChapterId.id,
      },
    });

    const expectedMessage = `Chapter's ${mockChapterId.id} has been deleted.`;
    expect(result).toEqual(expectedMessage);
  });

  it('should throw NotFoundException if chapter deletion fails', async () => {
    jest.spyOn(prisma.chapter, 'delete').mockResolvedValue(null);

    const mockChapterId: IdChapterModel = {
      id: '1',
    };

    await expect(chapterService.deleteChapter(mockChapterId)).rejects.toThrow(
      ConflictException,
    );
  });

  it('should throw ConflictException if an error occurs', async () => {
    jest
      .spyOn(prisma.chapter, 'delete')
      .mockRejectedValue(new Error('Some error'));

    const mockChapterId: IdChapterModel = {
      id: '1',
    };

    await expect(chapterService.deleteChapter(mockChapterId)).rejects.toThrow(
      ConflictException,
    );
  });
});

describe('getChapter', () => {
  let chapterService: ChapterService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [ChapterService],
    }).compile();

    chapterService = moduleRef.get<ChapterService>(ChapterService);
  });

  it('should retrieve the chapter and return the chapter model', async () => {
    // Mock the dependencies or services
    const mockChapterId = '1';
    const mockChapterDb: Chapter = {
      id: mockChapterId,
      section_id: '1',
      title: 'title',
      description: 'desc',
    };
    jest.spyOn(prisma.chapter, 'findFirst').mockResolvedValue(mockChapterDb);

    // Invoke the function being tested
    const result = await chapterService.getChapter(mockChapterId);

    // Perform assertions
    expect(prisma.chapter.findFirst).toHaveBeenCalledTimes(1);
    expect(prisma.chapter.findFirst).toHaveBeenCalledWith({
      where: {
        id: mockChapterId,
      },
    });

    const expectedChapterModel: ChapterModel = {
      sectionId: mockChapterDb.section_id,
      ...mockChapterDb,
    };
    expect(result).toEqual(expectedChapterModel);
  });

  it('should throw ConflictException if chapter is not found', async () => {
    jest.spyOn(prisma.chapter, 'findFirst').mockResolvedValue(null);

    const mockChapterId = '1';

    await expect(chapterService.getChapter(mockChapterId)).rejects.toThrow(
      ConflictException,
    );
  });

  it('should throw ConflictException if an error occurs', async () => {
    jest
      .spyOn(prisma.chapter, 'findFirst')
      .mockRejectedValue(new Error('Some error'));

    const mockChapterId = '1';

    await expect(chapterService.getChapter(mockChapterId)).rejects.toThrow(
      ConflictException,
    );
  });
});

describe('updateChapter', () => {
  let chapterService: ChapterService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [ChapterService],
    }).compile();

    chapterService = moduleRef.get<ChapterService>(ChapterService);
  });

  it('should update the chapter and return a success message', async () => {
    // Mock the dependencies or services
    const mockChapterId = '1';
    const mockChapterData: UpdateChapterModel = {
      title: 'Updated Chapter Title',
      description: 'Updated Chapter Description',
      sectionId: '1',
      // other updated chapter properties
    };
    const mockChapterDb: Chapter = {
      id: mockChapterId,
      section_id: mockChapterData.sectionId,
      title: mockChapterData.title,
      description: mockChapterData.description,
    };
    jest.spyOn(prisma.chapter, 'update').mockResolvedValue(mockChapterDb);

    // Invoke the function being tested
    const result = await chapterService.updateChapter(
      mockChapterId,
      mockChapterData,
    );

    // Perform assertions
    expect(prisma.chapter.update).toHaveBeenCalledTimes(1);
    expect(prisma.chapter.update).toHaveBeenCalledWith({
      where: {
        id: mockChapterId,
      },
      data: mockChapterData,
    });

    expect(result).toBe(`Chapter with id ${mockChapterId} has been updated`);
  });

  it('should throw ConflictException if chapter is not found', async () => {
    jest.spyOn(prisma.chapter, 'update').mockResolvedValue(null);

    const mockChapterId = '1';
    const mockChapterData: UpdateChapterModel = {
      title: 'Updated Chapter Title',
      description: 'Updated Chapter Description',
      sectionId: '1',
    };

    await expect(
      chapterService.updateChapter(mockChapterId, mockChapterData),
    ).rejects.toThrow(ConflictException);
  });

  it('should throw ConflictException if an error occurs', async () => {
    jest
      .spyOn(prisma.chapter, 'update')
      .mockRejectedValue(new Error('Some error'));

    const mockChapterId = '1';
    const mockChapterData: UpdateChapterModel = {
      title: 'Updated Chapter Title',
      description: 'Updated Chapter Description',
      sectionId: '1',
    };

    await expect(
      chapterService.updateChapter(mockChapterId, mockChapterData),
    ).rejects.toThrow(ConflictException);
  });
});

describe('getChapterLessons', () => {
  let chapterService: ChapterService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [ChapterService],
    }).compile();

    chapterService = moduleRef.get<ChapterService>(ChapterService);
  });

  it('should return an array of lessons for the given chapter', async () => {
    // Mock the dependencies or services
    const mockChapterId = '1';
    const mockLesson1: Lesson = {
      id: '1',
      chapter_id: mockChapterId,
      title: 'Lesson 1',
      description: 'Lesson 1 description',
      // other lesson properties
    };
    const mockLesson2: Lesson = {
      id: '2',
      chapter_id: mockChapterId,
      title: 'Lesson 2',
      description: 'Lesson 2 description',
      // other lesson properties
    };
    const mockCourseLessonsDb: Lesson[] = [mockLesson1, mockLesson2];
    jest
      .spyOn(prisma.lesson, 'findMany')
      .mockResolvedValue(mockCourseLessonsDb);

    // Invoke the function being tested
    const result = await chapterService.getChapterLessons(mockChapterId);

    // Perform assertions
    expect(prisma.lesson.findMany).toHaveBeenCalledTimes(1);
    expect(prisma.lesson.findMany).toHaveBeenCalledWith({
      where: {
        chapter_id: mockChapterId,
      },
    });

    expect(result).toEqual([
      {
        id: mockLesson1.id,
        chapterId: mockLesson1.chapter_id,
        title: mockLesson1.title,
        description: mockLesson1.description,
      },
      {
        id: mockLesson2.id,
        chapterId: mockLesson2.chapter_id,
        title: mockLesson2.title,
        description: mockLesson2.description,
      },
    ]);
  });

  it('should throw NotFoundException if an error occurs', async () => {
    jest
      .spyOn(prisma.lesson, 'findMany')
      .mockRejectedValue(new Error('Some error'));

    const mockChapterId = '1';

    await expect(
      chapterService.getChapterLessons(mockChapterId),
    ).rejects.toThrow(NotFoundException);
  });
});
