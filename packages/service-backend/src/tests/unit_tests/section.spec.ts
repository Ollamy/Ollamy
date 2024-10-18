import { Test } from '@nestjs/testing';
import { SectionService } from 'section/section.service';
import {
  mockSectionData,
  mockSectionDb,
  mockSectionData2,
  mockSectionDb2,
  mockError,
  sectionId,
  mockSectionData3,
  mockSectionDb3,
  courseId,
  mockUserToSectionDb,
} from 'tests/data/section.data';
import prisma from 'client';
import { ConflictException } from '@nestjs/common';
import { context } from 'tests/data/user.data';

describe('postSection', () => {
  let sectionService: SectionService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [SectionService],
    }).compile();

    sectionService = moduleRef.get<SectionService>(SectionService);
  });
  it('should create a section and return the success message', async () => {
    jest.spyOn(prisma.section, 'findMany').mockResolvedValue(undefined);

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
        order: 'a0',
      },
    });

    expect(result).toStrictEqual({ id: mockSectionDb.id });
  });

  it('should throw NotFoundException if section creation fails', async () => {
    jest.spyOn(prisma.section, 'create').mockResolvedValue(null);

    await expect(sectionService.postSection(mockSectionData)).rejects.toThrow(
      ConflictException,
    );
  });

  it('should throw ConflictException if an error occurs', async () => {
    jest
      .spyOn(prisma.section, 'create')
      .mockRejectedValue(new Error('Some error'));

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
    jest.spyOn(prisma.section, 'delete').mockResolvedValue(mockSectionDb2);

    // Invoke the function being tested
    const result = await sectionService.deleteSection(mockSectionData2);

    // Perform assertions
    expect(prisma.section.delete).toHaveBeenCalledTimes(1);
    expect(prisma.section.delete).toHaveBeenCalledWith({
      where: {
        id: mockSectionData2.id,
      },
    });

    expect(result).toStrictEqual({ id: mockSectionData2.id });
  });

  it('should throw NotFoundException if section does not exist', async () => {
    jest.spyOn(prisma.section, 'delete').mockResolvedValue(null);

    await expect(
      sectionService.deleteSection(mockSectionData2),
    ).rejects.toThrow(ConflictException);
  });

  it('should throw ConflictException if section has already been removed', async () => {
    jest.spyOn(prisma.section, 'delete').mockRejectedValue(mockError);

    await expect(
      sectionService.deleteSection(mockSectionData2),
    ).rejects.toThrow(ConflictException);
  });

  it('should throw ConflictException if an error occurs', async () => {
    jest
      .spyOn(prisma.section, 'delete')
      .mockRejectedValue(new Error('Some error'));

    await expect(
      sectionService.deleteSection(mockSectionData2),
    ).rejects.toThrow(ConflictException);
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
    jest.spyOn(prisma.section, 'findUnique').mockResolvedValue(mockSectionDb);

    jest
      .spyOn(prisma.usertoSection, 'findUnique')
      .mockResolvedValue(mockUserToSectionDb);

    // Invoke the function being tested
    const result = await sectionService.getSection(sectionId, context);

    // Perform assertions
    expect(prisma.section.findUnique).toHaveBeenCalledTimes(1);
    expect(prisma.section.findUnique).toHaveBeenCalledWith({
      where: {
        id: sectionId,
      },
    });

    expect(result).toEqual({
      courseId: mockSectionDb.course_id,
      description: mockSectionDb.description,
      title: mockSectionDb.title,
      order: mockSectionDb.order,
    });
  });

  it('should throw ConflictException if section does not exist', async () => {
    jest.spyOn(prisma.section, 'findUnique').mockResolvedValue(null);

    await expect(sectionService.getSection(sectionId, context)).rejects.toThrow(
      ConflictException,
    );
  });

  it('should throw ConflictException if an error occurs', async () => {
    jest
      .spyOn(prisma.section, 'findUnique')
      .mockRejectedValue(new Error('Some error'));

    await expect(sectionService.getSection(sectionId, context)).rejects.toThrow(
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

    jest.spyOn(prisma.section, 'update').mockResolvedValue(mockSectionDb3);

    // Invoke the function being tested
    const result = await sectionService.updateSection(
      sectionId,
      mockSectionData3,
    );

    // Perform assertions
    expect(prisma.section.update).toHaveBeenCalledTimes(1);
    expect(prisma.section.update).toHaveBeenCalledWith({
      where: {
        id: sectionId,
      },
      data: {
        title: mockSectionData3.title,
        description: mockSectionData3.description,
        course_id: courseId,
      },
    });

    expect(result).toStrictEqual({ id: sectionId });
  });

  it('should throw ConflictException if section does not exist', async () => {
    jest.spyOn(prisma.section, 'update').mockResolvedValue(null);

    await expect(
      sectionService.updateSection(sectionId, mockSectionData3),
    ).rejects.toThrow(ConflictException);
  });

  it('should throw ConflictException if an error occurs', async () => {
    jest
      .spyOn(prisma.section, 'update')
      .mockRejectedValue(new Error('Some error'));

    await expect(
      sectionService.updateSection(sectionId, mockSectionData3),
    ).rejects.toThrow(ConflictException);
  });
});
