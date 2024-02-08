import { Test } from '@nestjs/testing';
import {
  Lesson,
  Question,
  QuestionDifficulty,
  UsertoLesson,
} from '@prisma/client';
import prisma from 'client';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { LessonService } from 'lesson/lesson.service';
import {
  CreateLessonModel,
  IdLessonModel,
  UpdateLessonModel,
} from 'lesson/lesson.dto';
import {
  mockContext,
  mockCreatedLesson,
  mockLessonData,
  mockUserId,
  mockDeletedLesson,
  mockLessonData2,
  mockLesson,
  mockLessonId,
  mockLessonUpdatedData,
  mockUpdatedLesson,
  mockLessonData3,
  mockLessonQuestions
} from 'tests/data/lesson.data'
import { QuestionModel } from 'question/question.dto';

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
    jest
      .spyOn(prisma.usertoLesson, 'create')
      .mockResolvedValue({} as UsertoLesson);

    // Invoke the function being tested
    const result = await lessonService.postLesson(mockLessonData, mockContext);

    // Perform assertions
    expect(prisma.lesson.create).toHaveBeenCalledTimes(1);
    expect(prisma.lesson.create).toHaveBeenCalledWith({
      data: mockLessonData,
    });

    expect(result).toStrictEqual({ id: mockCreatedLesson.id });
  });

  it('should throw ConflictException if the lesson is not created', async () => {
    jest.spyOn(prisma.lesson, 'create').mockResolvedValue(null);

    await expect(
      lessonService.postLesson(mockLessonData, mockContext),
    ).rejects.toThrow(ConflictException);
  });

  it('should throw ConflictException if an error occurs', async () => {
    jest
      .spyOn(prisma.lesson, 'create')
      .mockRejectedValue(new Error('Some error'));

    await expect(
      lessonService.postLesson(mockLessonData, mockContext),
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

    jest.spyOn(prisma.lesson, 'findFirst').mockResolvedValue(mockLesson);

    // Invoke the function being tested
    const result = await lessonService.getLesson(mockLessonId);

    // Perform assertions
    expect(prisma.lesson.findFirst).toHaveBeenCalledTimes(1);
    expect(prisma.lesson.findFirst).toHaveBeenCalledWith({
      where: { id: mockLessonId },
    });

    expect(result).toEqual({
      sectionId: mockLesson.section_id,
      ...mockLesson,
    });
  });

  it('should throw ConflictException if the lesson does not exist', async () => {
    jest.spyOn(prisma.lesson, 'findFirst').mockResolvedValue(null);

    await expect(lessonService.getLesson(mockLessonId)).rejects.toThrow(
      ConflictException,
    );
  });

  it('should throw ConflictException if an error occurs', async () => {
    jest
      .spyOn(prisma.lesson, 'findFirst')
      .mockRejectedValue(new Error('Some error'));

    await expect(lessonService.getLesson(mockLessonId)).rejects.toThrow(
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

  it('should return the questions for the lesson when they exist', async () => {
    // Mock the dependencies or services
    jest
      .spyOn(prisma.question, 'findMany')
      .mockResolvedValue(mockLessonQuestions);

    // Invoke the function being tested
    const result = await lessonService.getLessonQuestions(mockLessonId);

    // Perform assertions
    expect(prisma.question.findMany).toHaveBeenCalledTimes(1);
    expect(prisma.question.findMany).toHaveBeenCalledWith({
      orderBy: [
        {
          order: 'asc',
        },
      ],
      where: { lesson_id: mockLessonId },
    });

    const expectedQuestions: QuestionModel[] = mockLessonQuestions.map(
      (question) => ({
        id: question.id,
        lessonId: question.lesson_id,
        title: question.title,
        description: question.description,
        trustAnswerId: question.trust_answer_id,
        typeAnswer: question.type_answer,
        typeQuestion: question.type_question,
        difficulty: question.difficulty,
        picture_id: question.picture_id,
        points: question.points,
        order: question.order,
      }),
    );

    // expect(result).toEqual(expectedQuestions);
  });

  it('should throw NotFoundException if an error occurs', async () => {
    jest
      .spyOn(prisma.question, 'findMany')
      .mockRejectedValue(new Error('Some error'));

    const mockLessonId = '123';

    await expect(
      lessonService.getLessonQuestions(mockLessonId),
    ).rejects.toThrow(NotFoundException);
  });
});
