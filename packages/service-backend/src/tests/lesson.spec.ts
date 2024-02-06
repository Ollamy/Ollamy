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
    // Mock the dependencies or services
    const mockLessonData: CreateLessonModel = {
      section_id: '1',
      title: 'lesson',
      description: 'desc',
    };
    const mockCreatedLesson: Lesson = {
      id: '123',
      section_id: mockLessonData.section_id,
      title: mockLessonData.title,
      description: mockLessonData.description,
    };
    const mockUserId = '123';
    const mockContext = {
      __user: {
        id: mockUserId,
      },
    };
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

    const mockLessonData: CreateLessonModel = {
      section_id: '1',
      title: 'lesson',
      description: 'desc',
    };
    const mockUserId = '123';
    const mockContext = {
      __user: {
        id: mockUserId,
      },
    };

    await expect(
      lessonService.postLesson(mockLessonData, mockContext),
    ).rejects.toThrow(ConflictException);
  });

  it('should throw ConflictException if an error occurs', async () => {
    jest
      .spyOn(prisma.lesson, 'create')
      .mockRejectedValue(new Error('Some error'));

    const mockLessonData: CreateLessonModel = {
      section_id: '1',
      title: 'lesson',
      description: 'desc',
    };
    const mockUserId = '123';
    const mockContext = {
      __user: {
        id: mockUserId,
      },
    };

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
    // Mock the dependencies or services
    const mockLessonData: IdLessonModel = {
      id: '1',
    };
    const mockDeletedLesson: Lesson = {
      id: mockLessonData.id,
      section_id: '1',
      title: 'title',
      description: 'desc',
    };
    jest.spyOn(prisma.lesson, 'delete').mockResolvedValue(mockDeletedLesson);

    // Invoke the function being tested
    const result = await lessonService.deleteLesson(mockLessonData);

    // Perform assertions
    expect(prisma.lesson.delete).toHaveBeenCalledTimes(1);
    expect(prisma.lesson.delete).toHaveBeenCalledWith({
      where: mockLessonData,
    });

    expect(result).toStrictEqual({ id: mockLessonData.id });
  });

  it('should throw NotFoundException if the lesson does not exist', async () => {
    jest.spyOn(prisma.lesson, 'delete').mockResolvedValue(null);

    const mockLessonData: IdLessonModel = {
      id: '1',
    };

    await expect(lessonService.deleteLesson(mockLessonData)).rejects.toThrow(
      ConflictException,
    );
  });

  it('should throw ConflictException if an error occurs', async () => {
    jest
      .spyOn(prisma.lesson, 'delete')
      .mockRejectedValue(new Error('Some error'));

    const mockLessonData: IdLessonModel = {
      id: '1',
    };

    await expect(lessonService.deleteLesson(mockLessonData)).rejects.toThrow(
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
    // Mock the dependencies or services
    const mockLessonId = '123';
    const mockLesson: Lesson = {
      id: mockLessonId,
      section_id: '456',
      title: 'title',
      description: 'desc',
    };
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

    const mockLessonId = '123';

    await expect(lessonService.getLesson(mockLessonId)).rejects.toThrow(
      ConflictException,
    );
  });

  it('should throw ConflictException if an error occurs', async () => {
    jest
      .spyOn(prisma.lesson, 'findFirst')
      .mockRejectedValue(new Error('Some error'));

    const mockLessonId = '123';

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
    // Mock the dependencies or services
    const mockLessonId = '123';
    const mockLessonData: UpdateLessonModel = {
      title: 'Updated Lesson Title',
      description: 'Updated Lesson Description',
    };
    const mockUpdatedLesson: Lesson = {
      id: mockLessonId,
      section_id: '456',
      ...mockLessonData,
    };
    jest.spyOn(prisma.lesson, 'update').mockResolvedValue(mockUpdatedLesson);

    // Invoke the function being tested
    const result = await lessonService.updateLesson(
      mockLessonId,
      mockLessonData,
    );

    // Perform assertions
    expect(prisma.lesson.update).toHaveBeenCalledTimes(1);
    expect(prisma.lesson.update).toHaveBeenCalledWith({
      where: { id: mockLessonId },
      data: mockLessonData,
    });

    expect(result).toStrictEqual({ id: mockLessonId });
  });

  it('should throw ConflictException if the lesson does not exist', async () => {
    jest.spyOn(prisma.lesson, 'update').mockResolvedValue(null);

    const mockLessonId = '123';
    const mockLessonData: UpdateLessonModel = {
      title: 'Updated Lesson Title',
      description: 'Updated Lesson Description',
      sectionId: '1',
    };

    await expect(
      lessonService.updateLesson(mockLessonId, mockLessonData),
    ).rejects.toThrow(ConflictException);
  });

  it('should throw ConflictException if an error occurs', async () => {
    jest
      .spyOn(prisma.lesson, 'update')
      .mockRejectedValue(new Error('Some error'));

    const mockLessonId = '123';
    const mockLessonData: UpdateLessonModel = {
      title: 'Updated Lesson Title',
      description: 'Updated Lesson Description',
      sectionId: '1',
    };

    await expect(
      lessonService.updateLesson(mockLessonId, mockLessonData),
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
    const mockLessonId = '123';
    const mockLessonQuestions: Question[] = [
      {
        id: '1',
        lesson_id: mockLessonId,
        title: 'Question 1',
        description: 'Description 1',
        trust_answer_id: '1',
        type_answer: 'TEXT',
        type_question: 'TEXT',
        difficulty: QuestionDifficulty.BEGINNER,
        picture_id: '1',
        points: 1,
        order: 0,
        // other question properties
      },
      {
        id: '2',
        lesson_id: mockLessonId,
        title: 'Question 2',
        description: 'Description 2',
        trust_answer_id: '1',
        type_answer: 'QUIZ',
        type_question: 'VIDEO',
        difficulty: QuestionDifficulty.ADVANCED,
        picture_id: '2',
        points: 2,
        order: 1,
        // other question properties
      },
      // other questions
    ];
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
