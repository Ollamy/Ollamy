import { Test } from '@nestjs/testing';
import { Question } from '@prisma/client';
import prisma from 'client';
import { ConflictException } from '@nestjs/common';
import {
  CreateQuestionModel,
  IdQuestionModel,
  UpdateQuestionModel,
} from './question.dto';
import { QuestionService } from './question.service';

describe('postQuestion', () => {
  let questionService: QuestionService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [QuestionService],
    }).compile();

    questionService = moduleRef.get<QuestionService>(QuestionService);
  });
  it('should create a question and return the ID', async () => {
    // Mock the dependencies or services
    const mockQuestionData: CreateQuestionModel = {
      lessonId: '123',
      title: 'Question Title',
      description: 'Question Description',
      typeAnswer: 'TEXT',
      typeQuestion: 'TEXT',
      data: 'test',
    };
    const mockQuestionDb: Question = {
      id: '1',
      lesson_id: mockQuestionData.lessonId,
      title: mockQuestionData.title,
      description: mockQuestionData.description,
      type_answer: mockQuestionData.typeAnswer,
      type_question: mockQuestionData.typeQuestion,
      data: mockQuestionData.data,
      trust_answer_id: '1',
    };
    jest.spyOn(prisma.question, 'create').mockResolvedValue(mockQuestionDb);

    // Invoke the function being tested
    const result = await questionService.postQuestion(mockQuestionData);

    // Perform assertions
    expect(prisma.question.create).toHaveBeenCalledTimes(1);
    expect(prisma.question.create).toHaveBeenCalledWith({
      data: {
        lesson_id: mockQuestionData.lessonId,
        title: mockQuestionData.title,
        description: mockQuestionData.description,
        type_answer: mockQuestionData.typeAnswer,
        type_question: mockQuestionData.typeQuestion,
      },
    });

    expect(result).toBe(`Question created with id ${mockQuestionDb.id}`);
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
      data: '1',
      trust_answer_id: '1',
      description: '1',
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

    expect(result).toBe(`Question's ${mockQuestionId.id} has been deleted.`);
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
      data: '1',
      trust_answer_id: '1',
      description: '1',
      // other properties
    };
    jest.spyOn(prisma.question, 'findFirst').mockResolvedValue(mockQuestionDb);

    // Invoke the function being tested
    const result = await questionService.getQuestion(mockQuestionId);

    // Perform assertions
    expect(prisma.question.findFirst).toHaveBeenCalledTimes(1);
    expect(prisma.question.findFirst).toHaveBeenCalledWith({
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
  it('should return a success message when the question is updated', async () => {
    // Mock the dependencies or services
    const mockQuestionId = '123';
    const mockQuestionData: UpdateQuestionModel = {
      lessonId: '1',
      title: 'test',
      description: 'desc',
      data: 'data',
      // updated question data
    };
    const mockUpdatedQuestion: Question = {
      id: mockQuestionId,
      lesson_id: '1',
      title: '2',
      type_answer: 'TEXT',
      type_question: 'TEXT',
      data: '1',
      trust_answer_id: '1',
      description: '1',
      // updated question properties
    };
    jest
      .spyOn(prisma.question, 'update')
      .mockResolvedValue(mockUpdatedQuestion);

    // Invoke the function being tested
    const result = await questionService.updateQuestion(
      mockQuestionId,
      mockQuestionData,
    );

    // Perform assertions
    expect(prisma.question.update).toHaveBeenCalledTimes(1);
    expect(prisma.question.update).toHaveBeenCalledWith({
      where: {
        id: mockQuestionId,
      },
      data: mockQuestionData,
    });

    expect(result).toBe(`Question with id ${mockQuestionId} has been updated`);
  });

  it('should throw ConflictException if the question does not exist', async () => {
    jest.spyOn(prisma.question, 'update').mockResolvedValue(null);

    const mockQuestionId = '123';
    const mockQuestionData: UpdateQuestionModel = {
      lessonId: '1',
      title: 'test',
      description: 'desc',
      data: 'data',
    };

    await expect(
      questionService.updateQuestion(mockQuestionId, mockQuestionData),
    ).rejects.toThrow(ConflictException);
  });

  it('should throw ConflictException if an error occurs', async () => {
    jest
      .spyOn(prisma.question, 'update')
      .mockRejectedValue(new Error('Some error'));

    const mockQuestionId = '123';
    const mockQuestionData: UpdateQuestionModel = {
      lessonId: '1',
      title: 'test',
      description: 'desc',
      data: 'data',
    };

    await expect(
      questionService.updateQuestion(mockQuestionId, mockQuestionData),
    ).rejects.toThrow(ConflictException);
  });
});
