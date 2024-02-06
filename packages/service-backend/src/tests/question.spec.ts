import { Test } from '@nestjs/testing';
import { Question } from '@prisma/client';
import prisma from 'client';
import { ConflictException } from '@nestjs/common';
import {
  CreateQuestionModel,
  IdQuestionModel,
  UpdateQuestionModel,
  validateAnswerModel,
} from 'question/question.dto';
import { QuestionService } from 'question/question.service';
import { PictureService } from 'picture/picture.service';
import { v4 as uuidv4 } from 'uuid';

describe('postQuestion', () => {
  let questionService: QuestionService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [QuestionService],
    }).compile();

    questionService = moduleRef.get<QuestionService>(QuestionService);
  });

  it('should throw NotFoundException if question creation fails', async () => {
    jest.spyOn(prisma.question, 'create').mockResolvedValue(null);

    const mockQuestionData: CreateQuestionModel = {
      lessonId: '123',
      title: 'Question Title',
      description: 'Question Description',
      typeAnswer: 'TEXT',
      typeQuestion: 'TEXT',
      data: 'test',
      order: 0,
    };

    await expect(
      questionService.postQuestion(mockQuestionData),
    ).rejects.toThrow(ConflictException);
  });

  it('should throw ConflictException if an error occurs', async () => {
    jest
      .spyOn(prisma.question, 'create')
      .mockRejectedValue(new Error('Some error'));

    const mockQuestionData: CreateQuestionModel = {
      lessonId: '123',
      title: 'Question Title',
      description: 'Question Description',
      typeAnswer: 'TEXT',
      typeQuestion: 'TEXT',
      data: 'test',
      order: 0,
    };

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
    // Mock the dependencies or services
    const mockQuestionId: IdQuestionModel = {
      id: '123',
    };
    const mockQuestionDb: Question = {
      id: mockQuestionId.id,
      lesson_id: '1',
      title: '2',
      type_answer: 'TEXT',
      type_question: 'TEXT',
      trust_answer_id: '1',
      description: '1',
      picture_id: '',
      points: 0,
      difficulty: 'BEGINNER',
      order: 0,
    };
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

    const mockQuestionId: IdQuestionModel = {
      id: '123',
    };

    await expect(
      questionService.deleteQuestion(mockQuestionId),
    ).rejects.toThrow(ConflictException);
  });

  it('should throw ConflictException if an error occurs', async () => {
    jest
      .spyOn(prisma.question, 'delete')
      .mockRejectedValue(new Error('Some error'));

    const mockQuestionId: IdQuestionModel = {
      id: '123',
    };

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
    const mockQuestionId = '123';
    const mockQuestionDb: Question = {
      id: mockQuestionId,
      lesson_id: '1',
      title: '2',
      type_answer: 'TEXT',
      type_question: 'TEXT',
      trust_answer_id: '1',
      description: '1',
      picture_id: '1',
      points: 0,
      difficulty: 'BEGINNER',
      order: 0,
    };
    jest.spyOn(PictureService, 'getPicture').mockResolvedValue('1');
    jest.spyOn(prisma.question, 'findFirst').mockResolvedValue(mockQuestionDb);

    // Invoke the function being tested
    const result = await questionService.getQuestion(mockQuestionId);

    // Perform assertions
    expect(prisma.question.findFirst).toHaveBeenCalledTimes(1);
    expect(prisma.question.findFirst).toHaveBeenCalledWith({
      orderBy: [
        {
          order: 'asc',
        },
      ],
      where: {
        id: mockQuestionId,
      },
    });

    expect(result).toEqual({
      id: mockQuestionDb.id,
      lessonId: mockQuestionDb.lesson_id,
      title: mockQuestionDb.title,
      description: mockQuestionDb.description,
      typeAnswer: mockQuestionDb.type_answer,
      typeQuestion: mockQuestionDb.type_question,
      trustAnswerId: mockQuestionDb.trust_answer_id,
      difficulty: mockQuestionDb.difficulty,
      pictureId: mockQuestionDb.picture_id,
      order: mockQuestionDb.order,
    });
  });

  it('should throw ConflictException if the question does not exist', async () => {
    jest.spyOn(prisma.question, 'findFirst').mockResolvedValue(null);

    const mockQuestionId = '123';

    await expect(questionService.getQuestion(mockQuestionId)).rejects.toThrow(
      ConflictException,
    );
  });

  it('should throw ConflictException if an error occurs', async () => {
    jest
      .spyOn(prisma.question, 'findFirst')
      .mockRejectedValue(new Error('Some error'));

    const mockQuestionId = '123';

    await expect(questionService.getQuestion(mockQuestionId)).rejects.toThrow(
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

    const mockQuestionId = '98ea81ae-678a-4cf5-bd88-2e6f43429c24';
    const mockQuestionData: UpdateQuestionModel = {
      lessonId: 'a4dca408-a53d-4fb5-b566-e2fb3ec90078',
      title: 'test',
      description: 'desc',
      trustAnswerId: '1',
    };

    await expect(
      questionService.updateQuestion(mockQuestionId, mockQuestionData),
    ).rejects.toThrow(ConflictException);
  });

  it('should throw ConflictException if an error occurs', async () => {
    jest
      .spyOn(prisma.question, 'update')
      .mockRejectedValue(new Error('Some error'));

    const mockQuestionId = '98ea81ae-678a-4cf5-bd88-2e6f43429c24';
    const mockQuestionData: UpdateQuestionModel = {
      lessonId: 'a4dca408-a53d-4fb5-b566-e2fb3ec90078',
      title: 'test',
      description: 'desc',
      trustAnswerId: '1',
    };

    await expect(
      questionService.updateQuestion(mockQuestionId, mockQuestionData),
    ).rejects.toThrow(ConflictException);
  });

  it('should return success: true if the answer is correct', async () => {
    const correctAnswerId = uuidv4();
    const questionId = uuidv4();
    const lessonId = uuidv4();

    const mockBody: validateAnswerModel = {
      questionId: questionId,
      answerId: correctAnswerId,
    };
    const mockQuestionDb: Question = {
      id: mockBody.questionId,
      lesson_id: lessonId,
      title: '2',
      type_answer: 'TEXT',
      type_question: 'TEXT',
      trust_answer_id: correctAnswerId,
      description: '1',
      picture_id: '1',
      points: 0,
      difficulty: 'BEGINNER',
      order: 0,
    };
    jest.spyOn(prisma.question, 'findUnique').mockResolvedValue(mockQuestionDb);
    jest.spyOn(prisma.question, 'findMany').mockResolvedValue([]);

    await expect(questionService.validateAnswer(mockBody)).resolves.toEqual({
      success: true,
      answer: correctAnswerId,
      end: true,
      nextQuestionId: undefined,
    });
  });

  it('should return success: false if the answer is incorrect', async () => {
    const incorrectAnswerId = uuidv4();
    const correctAnswerId = uuidv4();
    const questionId = uuidv4();
    const lessonId = uuidv4();

    const mockBody: validateAnswerModel = {
      questionId: questionId,
      answerId: incorrectAnswerId,
    };
    const mockQuestionDb: Question = {
      id: mockBody.questionId,
      lesson_id: lessonId,
      title: '2',
      type_answer: 'TEXT',
      type_question: 'TEXT',
      trust_answer_id: correctAnswerId,
      description: '1',
      picture_id: '1',
      points: 0,
      difficulty: 'BEGINNER',
      order: 0,
    };
    jest.spyOn(prisma.question, 'findUnique').mockResolvedValue(mockQuestionDb);
    jest.spyOn(prisma.question, 'findMany').mockResolvedValue([]);

    await expect(questionService.validateAnswer(mockBody)).resolves.toEqual({
      success: false,
      answer: correctAnswerId,
      end: true,
      nextQuestionId: undefined,
    });
  });
});
