import { Test } from '@nestjs/testing';
import { SectionService } from 'section/section.service';
import {
  CreateSectionModel,
  IdSectionModel,
  UpdateSectionModel,
} from '../section/section.dto';
import { Lesson, Prisma, Section } from '@prisma/client';
import prisma from 'client';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('postSection', () => {
  let sectionService: SectionService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [SectionService],
    }).compile();

    sectionService = moduleRef.get<SectionService>(SectionService);
  });
  it('should create a section and return the success message', async () => {
    // Mock the dependencies or services
    const mockSectionData: CreateSectionModel = {
      courseId: '123',
      title: 'Section Title',
      description: 'Section Description',
    };
    const mockSectionDb: Section = {
      id: '456',
      course_id: mockSectionData.courseId,
      title: mockSectionData.title,
      description: mockSectionData.description,
    };
    jest.spyOn(prisma.section, 'create').mockResolvedValue(mockSectionDb);

    // Invoke the function being tested
    const result = await sectionService.postSection(mockSectionData);

    // Perform assertions
    expect(prisma.section.create).toHaveBeenCalledTimes(1);
    expect(prisma.section.create).toHaveBeenCalledWith({
      data: {
        course_id: mockSectionData.courseId,
        title: mockSectionData.title,
        description: mockSectionData.description,
      },
    });

    expect(result).toStrictEqual({ id: mockSectionDb.id });
  });

  it('should throw NotFoundException if section creation fails', async () => {
    jest.spyOn(prisma.section, 'create').mockResolvedValue(null);

    const mockSectionData: CreateSectionModel = {
      courseId: '123',
      title: 'Section Title',
      description: 'Section Description',
    };

    await expect(sectionService.postSection(mockSectionData)).rejects.toThrow(
      ConflictException,
    );
  });

  it('should throw ConflictException if an error occurs', async () => {
    jest
      .spyOn(prisma.section, 'create')
      .mockRejectedValue(new Error('Some error'));

    const mockSectionData: CreateSectionModel = {
      courseId: '123',
      title: 'Section Title',
      description: 'Section Description',
    };

    await expect(sectionService.postSection(mockSectionData)).rejects.toThrow(
      ConflictException,
    );
  });
});

describe('deleteSection', () => {
  let sectionService: SectionService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [SectionService],
    }).compile();

    sectionService = moduleRef.get<SectionService>(SectionService);
  });

  it('should delete a section and return the success message', async () => {
    // Mock the dependencies or services
    const mockSectionData: IdSectionModel = {
      id: '123',
    };
    const mockSectionDb: Section = {
      id: mockSectionData.id,
      course_id: '123',
      title: 'Section Title',
      description: 'Section Description',
      // other properties
    };
    jest.spyOn(prisma.section, 'delete').mockResolvedValue(mockSectionDb);

    // Invoke the function being tested
    const result = await sectionService.deleteSection(mockSectionData);

    // Perform assertions
    expect(prisma.section.delete).toHaveBeenCalledTimes(1);
    expect(prisma.section.delete).toHaveBeenCalledWith({
      where: {
        id: mockSectionData.id,
      },
    });

    expect(result).toStrictEqual({ id: mockSectionData.id });
  });

  it('should throw NotFoundException if section does not exist', async () => {
    jest.spyOn(prisma.section, 'delete').mockResolvedValue(null);

    const mockSectionData: IdSectionModel = {
      id: '123',
    };

    await expect(sectionService.deleteSection(mockSectionData)).rejects.toThrow(
      ConflictException,
    );
  });

  it('should throw ConflictException if section has already been removed', async () => {
    const mockError: Prisma.PrismaClientKnownRequestError =
      new Prisma.PrismaClientKnownRequestError('error', {
        code: '1',
        clientVersion: '1',
      });
    jest.spyOn(prisma.section, 'delete').mockRejectedValue(mockError);

    const mockSectionData: IdSectionModel = {
      id: '123',
    };

    await expect(sectionService.deleteSection(mockSectionData)).rejects.toThrow(
      ConflictException,
    );
  });

  it('should throw ConflictException if an error occurs', async () => {
    jest
      .spyOn(prisma.section, 'delete')
      .mockRejectedValue(new Error('Some error'));

    const mockSectionData: IdSectionModel = {
      id: '123',
    };

    await expect(sectionService.deleteSection(mockSectionData)).rejects.toThrow(
      ConflictException,
    );
  });
});

describe('getSection', () => {
  let sectionService: SectionService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [SectionService],
    }).compile();

    sectionService = moduleRef.get<SectionService>(SectionService);
  });

  it('should return a section when it exists', async () => {
    // Mock the dependencies or services
    const mockSectionId = '123';
    const mockSectionDb: Section = {
      id: mockSectionId,
      course_id: '456',
      title: 'Section Title',
      description: 'Section Description',
    };
    jest.spyOn(prisma.section, 'findFirst').mockResolvedValue(mockSectionDb);

    // Invoke the function being tested
    const result = await sectionService.getSection(mockSectionId);

    // Perform assertions
    expect(prisma.section.findFirst).toHaveBeenCalledTimes(1);
    expect(prisma.section.findFirst).toHaveBeenCalledWith({
      where: {
        id: mockSectionId,
      },
    });

    expect(result).toEqual({
      courseId: mockSectionDb.course_id,
      description: mockSectionDb.description,
      id: mockSectionDb.id,
      title: mockSectionDb.title,
    });
  });

  it('should throw ConflictException if section does not exist', async () => {
    jest.spyOn(prisma.section, 'findFirst').mockResolvedValue(null);

    const mockSectionId = '123';

    await expect(sectionService.getSection(mockSectionId)).rejects.toThrow(
      ConflictException,
    );
  });

  it('should throw ConflictException if an error occurs', async () => {
    jest
      .spyOn(prisma.section, 'findFirst')
      .mockRejectedValue(new Error('Some error'));

    const mockSectionId = '123';

    await expect(sectionService.getSection(mockSectionId)).rejects.toThrow(
      ConflictException,
    );
  });
});

describe('updateSection', () => {
  let sectionService: SectionService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [SectionService],
    }).compile();

    sectionService = moduleRef.get<SectionService>(SectionService);
  });

  it('should update a section and return the success message', async () => {
    // Mock the dependencies or services
    const mockSectionId = '123';
    const mockSectionData: UpdateSectionModel = {
      title: 'Updated Section Title',
      description: 'Updated Section Description',
      courseId: '456',
    };
    const mockSectionDb: Section = {
      id: mockSectionId,
      course_id: '456',
      title: 'Section Title',
      description: 'Section Description',
    };
    jest.spyOn(prisma.section, 'update').mockResolvedValue(mockSectionDb);

    // Invoke the function being tested
    const result = await sectionService.updateSection(
      mockSectionId,
      mockSectionData,
    );

    // Perform assertions
    expect(prisma.section.update).toHaveBeenCalledTimes(1);
    expect(prisma.section.update).toHaveBeenCalledWith({
      where: {
        id: mockSectionId,
      },
      data: {
        title: 'Updated Section Title',
        description: 'Updated Section Description',
        course_id: '456',
      },
    });

    expect(result).toStrictEqual({ id: mockSectionId });
  });

  it('should throw ConflictException if section does not exist', async () => {
    jest.spyOn(prisma.section, 'update').mockResolvedValue(null);

    const mockSectionId = '123';
    const mockSectionData: UpdateSectionModel = {
      title: 'Updated Section Title',
      description: 'Updated Section Description',
      courseId: '456',
    };

    await expect(
      sectionService.updateSection(mockSectionId, mockSectionData),
    ).rejects.toThrow(ConflictException);
  });

  it('should throw ConflictException if an error occurs', async () => {
    jest
      .spyOn(prisma.section, 'update')
      .mockRejectedValue(new Error('Some error'));

    const mockSectionId = '123';
    const mockSectionData: UpdateSectionModel = {
      title: 'Updated Section Title',
      description: 'Updated Section Description',
      courseId: '456',
    };

    await expect(
      sectionService.updateSection(mockSectionId, mockSectionData),
    ).rejects.toThrow(ConflictException);
  });
});

describe('getSectionLessons', () => {
  let sectionService: SectionService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [SectionService],
    }).compile();

    sectionService = moduleRef.get<SectionService>(SectionService);
  });
  it('should return an array of lessons when they exist', async () => {
    // Mock the dependencies or services
    const mockSectionId = '123';
    const mockLessonDb: Lesson[] = [
      {
        id: '1',
        section_id: mockSectionId,
        title: 'Lesson 1',
        description: 'Lesson 1 Description',
      },
      {
        id: '2',
        section_id: mockSectionId,
        title: 'Lesson 2',
        description: 'Lesson 2 Description',
      },
    ];
    jest.spyOn(prisma.lesson, 'findMany').mockResolvedValue(mockLessonDb);

    // Invoke the function being tested
    const result = await sectionService.getSectionLessons(mockSectionId);

    // Perform assertions
    expect(prisma.lesson.findMany).toHaveBeenCalledTimes(1);
    expect(prisma.lesson.findMany).toHaveBeenCalledWith({
      where: {
        section_id: mockSectionId,
      },
    });

    expect(result).toEqual(
      mockLessonDb.map((lesson: Lesson) => ({
        sectionId: lesson.section_id,
        description: lesson.description,
        id: lesson.id,
        title: lesson.title,
      })),
    );
  });

  it('should throw NotFoundException if an error occurs', async () => {
    jest
      .spyOn(prisma.lesson, 'findMany')
      .mockRejectedValue(new Error('Some error'));

    const mockSectionId = '123';

    await expect(
      sectionService.getSectionLessons(mockSectionId),
    ).rejects.toThrow(NotFoundException);
  });
});
