import { Test } from '@nestjs/testing';
import prisma from 'client';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { LessonService } from 'lesson/lesson.service';

import { context, userId } from './data/user.data';
import {
  mockCreatedLesson,
  mockLessonData,
  mockDeletedLesson,
  mockLessonData2,
  mockLesson,
  mockLessonId,
  mockLessonUpdatedData,
  mockUpdatedLesson,
  mockLessonData3,
  mockGetLesson,
  mockLessonExtended,
} from 'tests/data/lesson.data';

describe('postLesson', () => {
  let lessonService: LessonService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [LessonService],
    }).compile();

    lessonService = moduleRef.get<LessonService>(LessonService);
  });
  it('should return a success message when the lesson is created', async () => {
    jest.spyOn(prisma.lesson, 'create').mockResolvedValue(mockCreatedLesson);
    jest.spyOn(prisma.usertoLesson, 'create').mockResolvedValue(null);

    // Invoke the function being tested
    const result = await lessonService.postLesson(mockLessonData, context);

    // Perform assertions
    expect(prisma.lesson.create).toHaveBeenCalledTimes(1);

    const { sectionId, ...otherData } = mockLessonData;

    expect(prisma.lesson.create).toHaveBeenCalledWith({
      data: {
        ...otherData,
        section_id: sectionId,
      },
    });

    expect(result).toStrictEqual({ id: mockCreatedLesson.id });
  });

  it('should throw ConflictException if the lesson is not created', async () => {
    jest.spyOn(prisma.lesson, 'create').mockResolvedValue(null);

    await expect(
      lessonService.postLesson(mockLessonData, context.__user.id),
    ).rejects.toThrow(ConflictException);
  });

  it('should throw ConflictException if an error occurs', async () => {
    jest
      .spyOn(prisma.lesson, 'create')
      .mockRejectedValue(new Error('Some error'));

    await expect(
      lessonService.postLesson(mockLessonData, context.__user.id),
    ).rejects.toThrow(ConflictException);
  });
});

describe('deleteLesson', () => {
  let lessonService: LessonService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [LessonService],
    }).compile();

    lessonService = moduleRef.get<LessonService>(LessonService);
  });

  it('should return a success message when the lesson is deleted', async () => {
    jest.spyOn(prisma.lesson, 'delete').mockResolvedValue(mockDeletedLesson);

    // Invoke the function being tested
    const result = await lessonService.deleteLesson(mockLessonData2);

    // Perform assertions
    expect(prisma.lesson.delete).toHaveBeenCalledTimes(1);
    expect(prisma.lesson.delete).toHaveBeenCalledWith({
      where: mockLessonData2,
    });

    expect(result).toStrictEqual({ id: mockLessonData2.id });
  });

  it('should throw NotFoundException if the lesson does not exist', async () => {
    jest.spyOn(prisma.lesson, 'delete').mockResolvedValue(null);

    await expect(lessonService.deleteLesson(mockLessonData2)).rejects.toThrow(
      ConflictException,
    );
  });

  it('should throw ConflictException if an error occurs', async () => {
    jest
      .spyOn(prisma.lesson, 'delete')
      .mockRejectedValue(new Error('Some error'));

    await expect(lessonService.deleteLesson(mockLessonData2)).rejects.toThrow(
      ConflictException,
    );
  });
});

describe('getLesson', () => {
  let lessonService: LessonService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [LessonService],
    }).compile();

    lessonService = moduleRef.get<LessonService>(LessonService);
  });

  it('should return the lesson when it exists', async () => {
    jest
      .spyOn(prisma.lesson, 'findFirst')
      .mockResolvedValue(mockLessonExtended);
    jest
      .spyOn(prisma.question, 'count')
      .mockResolvedValue(mockGetLesson.numberOfQuestions);
    jest
      .spyOn(prisma.lecture, 'count')
      .mockResolvedValue(mockGetLesson.numberOfLectures);

    // Invoke the function being tested
    const result = await lessonService.getLesson(mockLessonId, userId);

    // Perform assertions
    expect(prisma.lesson.findFirst).toHaveBeenCalledTimes(1);
    expect(prisma.lesson.findFirst).toHaveBeenCalledWith({
      where: { id: mockLessonId },
    });

    expect(result).toEqual(mockGetLesson);
  });

  it('should throw ConflictException if the lesson does not exist', async () => {
    jest.spyOn(prisma.lesson, 'findFirst').mockResolvedValue(null);

    await expect(lessonService.getLesson(mockLessonId, userId)).rejects.toThrow(
      ConflictException,
    );
  });

  it('should throw ConflictException if an error occurs', async () => {
    jest
      .spyOn(prisma.lesson, 'findFirst')
      .mockRejectedValue(new Error('Some error'));

    await expect(lessonService.getLesson(mockLessonId, userId)).rejects.toThrow(
      ConflictException,
    );
  });
});

describe('updateLesson', () => {
  let lessonService: LessonService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [LessonService],
    }).compile();

    lessonService = moduleRef.get<LessonService>(LessonService);
  });

  it('should update the lesson when it exists', async () => {
    jest.spyOn(prisma.lesson, 'update').mockResolvedValue(mockUpdatedLesson);

    // Invoke the function being tested
    const result = await lessonService.updateLesson(
      mockLessonId,
      mockLessonUpdatedData,
    );

    // Perform assertions
    expect(prisma.lesson.update).toHaveBeenCalledTimes(1);
    expect(prisma.lesson.update).toHaveBeenCalledWith({
      where: { id: mockLessonId },
      data: mockLessonUpdatedData,
    });

    expect(result).toStrictEqual({ id: mockLessonId });
  });

  it('should throw ConflictException if the lesson does not exist', async () => {
    jest.spyOn(prisma.lesson, 'update').mockResolvedValue(null);

    await expect(
      lessonService.updateLesson(mockLessonId, mockLessonData),
    ).rejects.toThrow(ConflictException);
  });

  it('should throw ConflictException if an error occurs', async () => {
    jest
      .spyOn(prisma.lesson, 'update')
      .mockRejectedValue(new Error('Some error'));

    await expect(
      lessonService.updateLesson(mockLessonId, mockLessonData3),
    ).rejects.toThrow(ConflictException);
  });
});

describe('getLessonQuestions', () => {
  let lessonService: LessonService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [LessonService],
    }).compile();

    lessonService = moduleRef.get<LessonService>(LessonService);
  });

  it('should throw NotFoundException if an error occurs', async () => {
    jest
      .spyOn(prisma.question, 'findMany')
      .mockRejectedValue(new Error('Some error'));

    await expect(
      lessonService.getLessonQuestions(mockLessonId),
    ).rejects.toThrow(NotFoundException);
  });
});
