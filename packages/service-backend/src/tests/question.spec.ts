import { Test } from '@nestjs/testing';
import prisma from 'client';
import { ConflictException } from '@nestjs/common';
import {
  mockQuestionData,
  mockQuestionDb,
  mockQuestionId,
  mockQuestionDb2,
  mockQuestionId2,
  mockQuestionData2,
  mockQuestionId3,
  mockBody,
  mockQuestionDb3,
  correctAnswerId,
  mockQuestionDb4,
  mockBodyIncorrect,
  questionId,
  mockUserLesson,
} from 'tests/data/question.data';
import { context } from 'tests/data/user.data';

import { QuestionService } from 'question/question.service';
import { PictureService } from 'picture/picture.service';
import { mockLesson } from './data/lesson.data';
import { mockSection1, mockUserToCourse } from './data/course.data';
import { TasksService } from '../cron/cron.service';

describe('postQuestion', () => {
  let questionService: QuestionService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [QuestionService, TasksService],
    }).compile();

    questionService = moduleRef.get<QuestionService>(QuestionService);
  });

  it('should throw NotFoundException if question creation fails', async () => {
    jest.spyOn(prisma.question, 'create').mockResolvedValue(null);

    await expect(
      questionService.postQuestion(mockQuestionData),
    ).rejects.toThrow(ConflictException);
  });

  it('should throw ConflictException if an error occurs', async () => {
    jest
      .spyOn(prisma.question, 'create')
      .mockRejectedValue(new Error('Some error'));

    await expect(
      questionService.postQuestion(mockQuestionData),
    ).rejects.toThrow(ConflictException);
  });
});

describe('deleteQuestion', () => {
  let questionService: QuestionService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [QuestionService],
    }).compile();

    questionService = moduleRef.get<QuestionService>(QuestionService);
  });

  it('should delete a question and return the deletion message', async () => {
    jest.spyOn(prisma.question, 'delete').mockResolvedValue(mockQuestionDb);

    // Invoke the function being tested
    const result = await questionService.deleteQuestion(mockQuestionId);

    // Perform assertions
    expect(prisma.question.delete).toHaveBeenCalledTimes(1);
    expect(prisma.question.delete).toHaveBeenCalledWith({
      where: {
        id: mockQuestionId.id,
      },
    });

    expect(result).toStrictEqual({ id: mockQuestionId.id });
  });

  it('should throw NotFoundException if question deletion fails', async () => {
    jest.spyOn(prisma.question, 'delete').mockResolvedValue(null);

    await expect(
      questionService.deleteQuestion(mockQuestionId),
    ).rejects.toThrow(ConflictException);
  });

  it('should throw ConflictException if an error occurs', async () => {
    jest
      .spyOn(prisma.question, 'delete')
      .mockRejectedValue(new Error('Some error'));

    await expect(
      questionService.deleteQuestion(mockQuestionId),
    ).rejects.toThrow(ConflictException);
  });
});

describe('getQuestion', () => {
  let questionService: QuestionService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [QuestionService],
    }).compile();

    questionService = moduleRef.get<QuestionService>(QuestionService);
  });

  it('should return a question model when the question exists', async () => {
    // Mock the dependencies or services

    jest
      .spyOn(PictureService, 'getPicture')
      .mockResolvedValue(mockQuestionDb2.picture_id);
    jest.spyOn(prisma.question, 'findFirst').mockResolvedValue(mockQuestionDb2);

    // Invoke the function being tested
    const result = await questionService.getQuestion(mockQuestionId2);

    // Perform assertions
    expect(prisma.question.findFirst).toHaveBeenCalledTimes(1);
    expect(prisma.question.findFirst).toHaveBeenCalledWith({
      orderBy: [
        {
          order: 'asc',
        },
      ],
      where: {
        id: mockQuestionId2,
      },
    });

    expect(result).toEqual({
      lessonId: mockQuestionDb2.lesson_id,
      title: mockQuestionDb2.title,
      description: mockQuestionDb2.description,
      typeAnswer: mockQuestionDb2.type_answer,
      typeQuestion: mockQuestionDb2.type_question,
      difficulty: mockQuestionDb2.difficulty,
      pictureId: mockQuestionDb2.picture_id,
      order: mockQuestionDb2.order,
      points: mockQuestionDb2.points,
      trust_answer_id: mockQuestionDb2.trust_answer_id,
    });
  });

  it('should throw ConflictException if the question does not exist', async () => {
    jest.spyOn(prisma.question, 'findFirst').mockResolvedValue(null);

    await expect(questionService.getQuestion(questionId)).rejects.toThrow(
      ConflictException,
    );
  });

  it('should throw ConflictException if an error occurs', async () => {
    jest
      .spyOn(prisma.question, 'findFirst')
      .mockRejectedValue(new Error('Some error'));

    await expect(questionService.getQuestion(mockQuestionId2)).rejects.toThrow(
      ConflictException,
    );
  });
});

describe('updateQuestion', () => {
  let questionService: QuestionService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [QuestionService],
    }).compile();

    questionService = moduleRef.get<QuestionService>(QuestionService);
  });

  it('should throw ConflictException if the question does not exist', async () => {
    jest.spyOn(prisma.question, 'update').mockResolvedValue(null);

    await expect(
      questionService.updateQuestion(mockQuestionId3, mockQuestionData2),
    ).rejects.toThrow(ConflictException);
  });

  it('should throw ConflictException if an error occurs', async () => {
    jest
      .spyOn(prisma.question, 'update')
      .mockRejectedValue(new Error('Some error'));

    await expect(
      questionService.updateQuestion(mockQuestionId3, mockQuestionData2),
    ).rejects.toThrow(ConflictException);
  });
});
