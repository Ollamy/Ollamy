import { Test } from '@nestjs/testing';
import { Answer } from '@prisma/client';
import prisma from 'client';
import { ConflictException } from '@nestjs/common';
import {
  BaseAnswerModel,
  CreateAnswerModel,
  IdAnswerModel,
  UpdateAnswerModel,
} from './answer.dto';
import { AnswerService } from './answer.service';
import { PictureService } from '../picture/picture.service';

describe('postAnswer', () => {
  let answerService: AnswerService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [AnswerService],
    }).compile();

    answerService = moduleRef.get<AnswerService>(AnswerService);
  });
  it('should create a answer and return the ID', async () => {
    // Mock the dependencies or services
    const mockAnswerData: CreateAnswerModel = {
      questionId: '123',
      data: 'test',
      picture: 'picture',
    };
    const mockAnswerDb: Answer = {
      id: '1',
      question_id: mockAnswerData.questionId,
      data: mockAnswerData.data,
      picture_id: '1',
      order: 'a0',
    };

    jest.spyOn(prisma.answer, 'findMany').mockResolvedValue([]);
    jest.spyOn(PictureService, 'postPicture').mockResolvedValue('1');
    jest.spyOn(prisma.answer, 'create').mockResolvedValue(mockAnswerDb);

    // Invoke the function being tested
    const result = await answerService.postAnswer(mockAnswerData);

    // Perform assertions
    expect(prisma.answer.findMany).toHaveBeenCalledTimes(1);
    expect(prisma.answer.create).toHaveBeenCalledTimes(1);
    expect(prisma.answer.create).toHaveBeenCalledWith({
      data: {
        question_id: mockAnswerDb.question_id,
        data: mockAnswerDb.data,
        picture_id: mockAnswerDb.picture_id,
        order: mockAnswerDb.order,
      },
    });

    expect(result).toStrictEqual({ id: mockAnswerDb.id });
  });

  it('should throw NotFoundException if answer creation fails', async () => {
    jest.spyOn(prisma.answer, 'create').mockResolvedValue(null);

    const mockAnswerData: CreateAnswerModel = {
      questionId: '123',
      data: 'test',
      picture: 'picture',
    };

    await expect(answerService.postAnswer(mockAnswerData)).rejects.toThrow(
      ConflictException,
    );
  });

  it('should throw ConflictException if an error occurs', async () => {
    jest
      .spyOn(prisma.answer, 'create')
      .mockRejectedValue(new Error('Some error'));

    const mockAnswerData: CreateAnswerModel = {
      questionId: '123',
      data: 'test',
      picture: 'picture',
    };

    await expect(answerService.postAnswer(mockAnswerData)).rejects.toThrow(
      ConflictException,
    );
  });
});

describe('deleteAnswer', () => {
  let answerService: AnswerService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [AnswerService],
    }).compile();

    answerService = moduleRef.get<AnswerService>(AnswerService);
  });

  it('should delete a answer and return the deletion message', async () => {
    // Mock the dependencies or services
    const mockAnswerId: IdAnswerModel = {
      id: '123',
    };
    const mockAnswerDb: Answer = {
      id: mockAnswerId.id,
      question_id: '123',
      data: 'test',
      picture_id: '1',
      order: 'a0',
    };
    jest.spyOn(prisma.answer, 'delete').mockResolvedValue(mockAnswerDb);

    // Invoke the function being tested
    const result = await answerService.deleteAnswer(mockAnswerId);

    // Perform assertions
    expect(prisma.answer.delete).toHaveBeenCalledTimes(1);
    expect(prisma.answer.delete).toHaveBeenCalledWith({
      where: {
        id: mockAnswerId.id,
      },
    });

    expect(result).toStrictEqual({ id: mockAnswerId.id });
  });

  it('should throw NotFoundException if answer deletion fails', async () => {
    jest.spyOn(prisma.answer, 'delete').mockResolvedValue(null);

    const mockAnswerId: IdAnswerModel = {
      id: '123',
    };

    await expect(answerService.deleteAnswer(mockAnswerId)).rejects.toThrow(
      ConflictException,
    );
  });

  it('should throw ConflictException if an error occurs', async () => {
    jest
      .spyOn(prisma.answer, 'delete')
      .mockRejectedValue(new Error('Some error'));

    const mockAnswerId: IdAnswerModel = {
      id: '123',
    };

    await expect(answerService.deleteAnswer(mockAnswerId)).rejects.toThrow(
      ConflictException,
    );
  });
});

describe('getAnswer', () => {
  let answerService: AnswerService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [AnswerService],
    }).compile();

    answerService = moduleRef.get<AnswerService>(AnswerService);
  });

  it('should return a answer model when the answer exists', async () => {
    // Mock the dependencies or services
    const mockAnswerId = '123';
    const mockAnswerDb: Answer = {
      id: mockAnswerId,
      question_id: '123',
      data: '1',
      picture_id: '1',
      order: 'a0',
    };
    jest.spyOn(PictureService, 'getPicture').mockResolvedValue('1');
    jest.spyOn(prisma.answer, 'findFirst').mockResolvedValue(mockAnswerDb);

    // Invoke the function being tested
    const result = await answerService.getAnswer({
      id: mockAnswerId,
    } as IdAnswerModel);

    // Perform assertions
    expect(prisma.answer.findFirst).toHaveBeenCalledTimes(1);
    expect(prisma.answer.findFirst).toHaveBeenCalledWith({
      where: {
        id: mockAnswerId,
      },
    });

    expect(result).toEqual({
      questionId: mockAnswerDb.question_id,
      data: mockAnswerDb.data,
      picture: mockAnswerDb.picture_id,
      order: mockAnswerDb.order,
    });
  });

  it('should throw ConflictException if the answer does not exist', async () => {
    jest.spyOn(prisma.answer, 'findFirst').mockResolvedValue(null);

    const mockAnswerId = '123';

    await expect(
      answerService.getAnswer({
        id: mockAnswerId,
      } as IdAnswerModel),
    ).rejects.toThrow(ConflictException);
  });

  it('should throw ConflictException if an error occurs', async () => {
    jest
      .spyOn(prisma.answer, 'findFirst')
      .mockRejectedValue(new Error('Some error'));

    const mockAnswerId = '123';

    await expect(
      answerService.getAnswer({
        id: mockAnswerId,
      } as IdAnswerModel),
    ).rejects.toThrow(ConflictException);
  });
});

describe('updateAnswer', () => {
  let answerService: AnswerService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [AnswerService],
    }).compile();

    answerService = moduleRef.get<AnswerService>(AnswerService);
  });
  it('should return a success message when the answer is updated', async () => {
    // Mock the dependencies or services
    const mockAnswerId = '123';
    const mockAnswerData: UpdateAnswerModel = {
      questionId: mockAnswerId,
      data: '1',
      picture: 'picture',
      id: '',
      order: ''
    };
    const mockUpdatedAnswer: Answer = {
      id: mockAnswerId,
      question_id: mockAnswerId,
      data: '1',
      picture_id: '1',
      order: 'a0',
      // updated answer properties
    };
    jest.spyOn(PictureService, 'postPicture').mockResolvedValue('1');
    jest.spyOn(prisma.answer, 'update').mockResolvedValue(mockUpdatedAnswer);

    // Invoke the function being tested
    const result = await answerService.updateAnswer(
      {
        id: mockAnswerId,
      } as IdAnswerModel,
      mockAnswerData,
    );

    // Perform assertions
    expect(prisma.answer.update).toHaveBeenCalledTimes(1);
    expect(prisma.answer.update).toHaveBeenCalledWith({
      where: {
        id: mockAnswerId,
      },
      data: {
        data: '1',
        picture_id: '1',
        question_id: mockAnswerId,
      },
    });

    expect(result).toStrictEqual({ id: mockAnswerId });
  });

  it('should throw ConflictException if the answer does not exist', async () => {
    jest.spyOn(prisma.answer, 'update').mockResolvedValue(null);

    const mockAnswerId = '123';
    const mockAnswerData: UpdateAnswerModel = {
      questionId: '1',
      data: 'data',
      picture: 'picture',
      id: '',
      order: ''
    };

    await expect(
      answerService.updateAnswer(
        {
          id: mockAnswerId,
        } as IdAnswerModel,
        mockAnswerData,
      ),
    ).rejects.toThrow(ConflictException);
  });

  it('should throw ConflictException if an error occurs', async () => {
    jest
      .spyOn(prisma.answer, 'update')
      .mockRejectedValue(new Error('Some error'));

    const mockAnswerId = '123';
    const mockAnswerData: UpdateAnswerModel = {
      questionId: '1',
      data: 'data',
      picture: 'picture',
      id: '',
      order: ''
    };

    await expect(
      answerService.updateAnswer(
        {
          id: mockAnswerId,
        } as IdAnswerModel,
        mockAnswerData,
      ),
    ).rejects.toThrow(ConflictException);
  });
});
