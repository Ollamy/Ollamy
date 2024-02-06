import { Test } from '@nestjs/testing';
import { Lecture } from '@prisma/client';
import prisma from 'client';
import { ConflictException } from '@nestjs/common';
import {
  CreateLectureModel,
  IdLectureModel,
  UpdateLectureModel,
} from 'lecture/lecture.dto';
import { LectureService } from 'lecture/lecture.service';

describe('postLecture', () => {
  let lectureService: LectureService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [LectureService],
    }).compile();

    lectureService = moduleRef.get<LectureService>(LectureService);
  });

  it('should create a lecture and return the ID', async () => {
    // Mock the dependencies or services
    const mockLectureData: CreateLectureModel = {
      lessonId: '123',
      data: 'test',
    };
    const mockLectureDb: Lecture = {
      id: '1',
      lesson_id: mockLectureData.lessonId,
      data: mockLectureData.data,
    };
    jest.spyOn(prisma.lecture, 'create').mockResolvedValue(mockLectureDb);

    // Invoke the function being tested
    const result = await lectureService.postLecture(mockLectureData);

    // Perform assertions
    expect(prisma.lecture.create).toHaveBeenCalledTimes(1);
    expect(prisma.lecture.create).toHaveBeenCalledWith({
      data: {
        lesson_id: mockLectureDb.lesson_id,
        data: mockLectureDb.data,
      },
    });

    expect(result).toStrictEqual({ id: mockLectureDb.id });
  });

  it('should throw NotFoundException if lecture creation fails', async () => {
    jest.spyOn(prisma.lecture, 'create').mockResolvedValue(null);

    const mockLectureData: CreateLectureModel = {
      lessonId: '123',
      data: 'test',
    };

    await expect(lectureService.postLecture(mockLectureData)).rejects.toThrow(
      ConflictException,
    );
  });

  it('should throw ConflictException if an error occurs', async () => {
    jest
      .spyOn(prisma.lecture, 'create')
      .mockRejectedValue(new Error('Some error'));

    const mockLectureData: CreateLectureModel = {
      lessonId: '123',
      data: 'test',
    };

    await expect(lectureService.postLecture(mockLectureData)).rejects.toThrow(
      ConflictException,
    );
  });
});

describe('deleteLecture', () => {
  let lectureService: LectureService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [LectureService],
    }).compile();

    lectureService = moduleRef.get<LectureService>(LectureService);
  });

  it('should delete a lecture and return the deletion message', async () => {
    // Mock the dependencies or services
    const mockLectureId: IdLectureModel = {
      id: '123',
    };
    const mockLectureDb: Lecture = {
      id: mockLectureId.id,
      lesson_id: '123',
      data: 'test',
    };
    jest.spyOn(prisma.lecture, 'delete').mockResolvedValue(mockLectureDb);

    // Invoke the function being tested
    const result = await lectureService.deleteLecture(mockLectureId);

    // Perform assertions
    expect(prisma.lecture.delete).toHaveBeenCalledTimes(1);
    expect(prisma.lecture.delete).toHaveBeenCalledWith({
      where: {
        id: mockLectureId.id,
      },
    });

    expect(result).toStrictEqual({ id: mockLectureId.id });
  });

  it('should throw NotFoundException if lecture deletion fails', async () => {
    jest.spyOn(prisma.lecture, 'delete').mockResolvedValue(null);

    const mockLectureId: IdLectureModel = {
      id: '123',
    };

    await expect(lectureService.deleteLecture(mockLectureId)).rejects.toThrow(
      ConflictException,
    );
  });

  it('should throw ConflictException if an error occurs', async () => {
    jest
      .spyOn(prisma.lecture, 'delete')
      .mockRejectedValue(new Error('Some error'));

    const mockLectureId: IdLectureModel = {
      id: '123',
    };

    await expect(lectureService.deleteLecture(mockLectureId)).rejects.toThrow(
      ConflictException,
    );
  });
});

describe('getLecture', () => {
  let lectureService: LectureService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [LectureService],
    }).compile();

    lectureService = moduleRef.get<LectureService>(LectureService);
  });

  it('should return a lecture model when the lecture exists', async () => {
    // Mock the dependencies or services
    const mockLectureId = '123';
    const mockLectureDb: Lecture = {
      id: mockLectureId,
      lesson_id: '123',
      data: '1',
    };
    jest.spyOn(prisma.lecture, 'findUnique').mockResolvedValue(mockLectureDb);

    // Invoke the function being tested
    const result = await lectureService.getLecture({
      id: mockLectureId,
    } as IdLectureModel);

    // Perform assertions
    expect(prisma.lecture.findUnique).toHaveBeenCalledTimes(1);
    expect(prisma.lecture.findUnique).toHaveBeenCalledWith({
      where: {
        id: mockLectureId,
      },
    });

    expect(result).toEqual({
      lessonId: mockLectureDb.lesson_id,
      data: mockLectureDb.data,
    });
  });

  it('should throw ConflictException if the lecture does not exist', async () => {
    jest.spyOn(prisma.lecture, 'findUnique').mockResolvedValue(null);

    const mockLectureId = '123';

    await expect(
      lectureService.getLecture({
        id: mockLectureId,
      } as IdLectureModel),
    ).rejects.toThrow(ConflictException);
  });

  it('should throw ConflictException if an error occurs', async () => {
    jest
      .spyOn(prisma.lecture, 'findUnique')
      .mockRejectedValue(new Error('Some error'));

    const mockLectureId = '123';

    await expect(
      lectureService.getLecture({
        id: mockLectureId,
      } as IdLectureModel),
    ).rejects.toThrow(ConflictException);
  });
});

describe('updateLecture', () => {
  let lectureService: LectureService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [LectureService],
    }).compile();

    lectureService = moduleRef.get<LectureService>(LectureService);
  });

  it('should return a success message when the lecture is updated', async () => {
    // Mock the dependencies or services
    const mockLectureId = '123';
    const mockLectureData: UpdateLectureModel = {
      lessonId: mockLectureId,
      data: '1',
      // updated lecture data
    };
    const mockUpdatedLecture: Lecture = {
      id: mockLectureId,
      lesson_id: mockLectureId,
      data: '1',
      // updated lecture properties
    };
    jest.spyOn(prisma.lecture, 'update').mockResolvedValue(mockUpdatedLecture);

    // Invoke the function being tested
    const result = await lectureService.updateLecture(
      {
        id: mockLectureId,
      } as IdLectureModel,
      mockLectureData,
    );

    // Perform assertions
    expect(prisma.lecture.update).toHaveBeenCalledTimes(1);
    expect(prisma.lecture.update).toHaveBeenCalledWith({
      where: {
        id: mockLectureId,
      },
      data: {
        data: '1',
        lesson_id: mockLectureId,
      },
    });

    expect(result).toStrictEqual({ id: mockLectureId });
  });

  it('should throw ConflictException if the lecture does not exist', async () => {
    jest.spyOn(prisma.lecture, 'update').mockResolvedValue(null);

    const mockLectureId = '123';
    const mockLectureData: UpdateLectureModel = {
      lessonId: '1',
      data: 'data',
    };

    await expect(
      lectureService.updateLecture(
        {
          id: mockLectureId,
        } as IdLectureModel,
        mockLectureData,
      ),
    ).rejects.toThrow(ConflictException);
  });

  it('should throw ConflictException if an error occurs', async () => {
    jest
      .spyOn(prisma.lecture, 'update')
      .mockRejectedValue(new Error('Some error'));

    const mockLectureId = '123';
    const mockLectureData: UpdateLectureModel = {
      lessonId: '1',
      data: 'data',
    };

    await expect(
      lectureService.updateLecture(
        {
          id: mockLectureId,
        } as IdLectureModel,
        mockLectureData,
      ),
    ).rejects.toThrow(ConflictException);
  });
});
